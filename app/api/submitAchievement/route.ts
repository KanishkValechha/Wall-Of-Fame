import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Binary } from 'mongodb';
import { EmailService } from '@/app/utils/EmailServices';

// MongoDB connection
if (!process.env.mongoURL) {
    throw new Error("Missing MONGO_URL in environment variables");
}
const uri = process.env.mongoURL as string;
const client = new MongoClient(uri);

// Define expected file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_CERTIFICATE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export async function POST(req: NextRequest) {
    try {
        // Parse the multipart form data
        const formData = await req.formData();
        
        // Extract files
        const userImage = formData.get('userImage') as File;
        const certificateProof = formData.get('certificateProof') as File;

        // Validate file types
        if (!ALLOWED_IMAGE_TYPES.includes(userImage.type)) {
            return NextResponse.json(
                { error: 'Invalid user image type. Please upload JPEG or PNG.' },
                { status: 400 }
            );
        }

        if (!ALLOWED_CERTIFICATE_TYPES.includes(certificateProof.type)) {
            return NextResponse.json(
                { error: 'Invalid certificate type. Please upload PDF, JPEG, or PNG.' },
                { status: 400 }
            );
        }

        // Convert files to Binary for MongoDB storage
        const userImageArrayBuffer = await userImage.arrayBuffer();
        const certificateArrayBuffer = await certificateProof.arrayBuffer();

        // Create the achievement document
        const achievement = {
            fullName: formData.get('fullName') as string,
            registrationNumber: formData.get('registrationNumber'),
            mobileNumber: formData.get('mobileNumber'),
            studentMail: formData.get('studentMail') as string,
            achievementCategory: formData.get('achievementCategory'),
            professorName: formData.get('professorName'),
            professorEmail: formData.get('professorEmail') as string,
            userImage: {
                data: new Binary(new Uint8Array(userImageArrayBuffer)),
                contentType: userImage.type
            },
            certificateProof: {
                data: new Binary(new Uint8Array(certificateArrayBuffer)),
                contentType: certificateProof.type
            },
            submissionDate: new Date(),
            remarks: formData.get('remarks') || '',
            approved: null,
            overAllTop10: false,
            archived: false,
            description: '',
            order:-1
        };

        // Validate required fields
        const requiredFields = [
            'fullName',
            'registrationNumber',
            'mobileNumber',
            'achievementCategory',
            'professorName',
            'professorEmail'
        ];

        for (const field of requiredFields) {
            if (!formData.get(field)) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate mobile number
        const mobileNumber = formData.get('mobileNumber') as string;
        const mobileNumberPattern = /^[0-9]{10}$/;
        if (!mobileNumberPattern.test(mobileNumber)) {
            return NextResponse.json(
                { error: 'Invalid mobile number. It must be a valid 10-digit phone number.' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await client.connect();
        const db = client.db('Wall-Of-Fame');
        const collection = db.collection('achievers');
        const counters = db.collection('counters');
        const SEQ = await counters.findOneAndUpdate(
            { _id: "orderCounter" as any },
            { $inc: { seq: 1 } },
            { returnDocument: "after", upsert: true }
        );
        if (!SEQ || !SEQ.seq) {
            // console.log(SEQ , SEQ?.seq);
            throw new Error('Failed to retrieve order sequence number');
        }
        const orderNumber = SEQ.seq;
        achievement.order = orderNumber

                // Insert the achievement
        const result = await collection.insertOne(achievement);

        EmailService.sendEmail(achievement.professorEmail, `Achievement approval for ${achievement.fullName}`,
            //HTML
            `<h1>Dear ${achievement.professorName},</h1>
            <p>One of your students, ${achievement.fullName}, has submitted an achievement for approval. Please review the details and provide your feedback.</p>
            <p><strong>Registration Number:</strong> ${achievement.registrationNumber}</p>
            <p><strong>Phone Number:</strong> +91 ${achievement.mobileNumber}</p>
            <p><strong>Achievement Category:</strong> ${achievement.achievementCategory}</p>
            <p><strong>Submission Date:</strong> ${achievement.submissionDate}</p>
            <p><strong>Remarks:</strong> ${achievement.remarks}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/Dashboard">Click here</a> to approve or reject the achievement.</p>
            <p>Thank you!</p>`);

        return NextResponse.json({
            success: true,
            message: 'Achievement submitted successfully',
            documentId: result.insertedId
        });

    } catch (error: any) {
        console.error('Error submitting achievement:', error);
        if (error.name === 'MongoServerError' && error.code === 121) {
            const validationErrors = error.errInfo.details.schemaRulesNotSatisfied.map((rule: any) => {
                return rule.propertiesNotSatisfied.map((property: any) => {
                    return `${property.propertyName}: ${property.description}`;
                }).join(', ');
            }).join('; ');
            return NextResponse.json({ error: `Document failed validation: ${validationErrors}` }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'Failed to submit achievement' },
            { status: 500 }
        );
    } finally {
        // Always close the connection
        await client.close();
    }
}

// Set larger size limit for the API route
export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '10mb'
    }
};