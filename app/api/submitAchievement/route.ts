import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Binary } from 'mongodb';
import { EmailService } from '@/app/utils/EmailServices';
import { Blob } from 'buffer';

// MongoDB connection
if (!process.env.mongoURL) {
    throw new Error("Missing MONGO_URL in environment variables");
}
interface FormField {
    name: string;
    type: "document" | "text" | "option";
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
  }
  
const uri = process.env.mongoURL as string;
const client = new MongoClient(uri);
const achievementFormFields: Record<string, FormField[]> = {
    ONLINE_COURSES: [
      { name: "courseName", type: "text", label: "Course Name", required: true },
      { name: "courseCode", type: "text", label: "Course Code", required: true },
      { name: "startDate", type: "text", label: "Start Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "endDate", type: "text", label: "End Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "duration", type: "text", label: "Duration", placeholder: "e.g., 8 weeks", required: true },
      { name: "platform", type: "text", label: "Platform", placeholder: "e.g., Coursera, Udemy", required: true },
      { name: "certificatePDF", type: "document", label: "Certificate PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    OUTREACH_PROGRAMS: [
      { name: "activityName", type: "text", label: "Activity Name", required: true },
      { name: "organizingUnit", type: "text", label: "Organizing Unit", required: true },
      { name: "schemeName", type: "text", label: "Scheme Name", required: true },
      { name: "date", type: "text", label: "Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "reportPDF", type: "document", label: "Report PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    EVENT_PARTICIPATION: [
      { name: "eventName", type: "text", label: "Event Name", required: true },
      { 
        name: "eventType", 
        type: "option", 
        label: "Event Type", 
        options: ["Workshop", "Seminar", "Competition", "Conference", "Hackathon", "Other"], 
        required: true 
      },
      { name: "date", type: "text", label: "Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "certificatePDF", type: "document", label: "Certificate PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    AWARDS: [
      { name: "awardName", type: "text", label: "Award Name", required: true },
      { name: "organization", type: "text", label: "Organization", required: true },
      { name: "level", type: "text", label: "Level", required: true },
      { name: "date", type: "text", label: "Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "amount", type: "text", label: "Amount", placeholder: "e.g., 10000", required: true },
      { name: "awardPdf", type: "document", label: "Award PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    SCHOLARSHIPS: [
      { name: "scholarshipName", type: "text", label: "Scholarship Name", required: true },
      { name: "issuingAuthority", type: "text", label: "Issuing Authority", required: true },
      { name: "amount", type: "text", label: "Amount", placeholder: "e.g., 20000", required: true },
      { name: "proofPDF", type: "document", label: "Proof PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    RESEARCH_PUBLICATION: [
      { name: "publicationTitle", type: "text", label: "Publication Title", required: true },
      { name: "journalName", type: "text", label: "Journal Name", required: true },
      { name: "publicationType", type: "text", label: "Publication Type", required: true },
      { name: "date", type: "text", label: "Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "proofPDF", type: "document", label: "Proof PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    ACHIEVEMENTS: [
      { name: "achievementName", type: "text", label: "Achievement Name", required: true },
      { name: "date", type: "text", label: "Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "proofPDF", type: "document", label: "Proof PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    INTERNSHIPS: [
      { name: "organization", type: "text", label: "Organization", required: true },
      { name: "startDate", type: "text", label: "Start Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "endDate", type: "text", label: "End Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "stipend", type: "text", label: "Stipend", placeholder: "e.g., 5000/month", required: true },
      { name: "internshipCertificatePdf", type: "document", label: "Internship Certificate PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    STARTUPS: [
      { name: "startupName", type: "text", label: "Startup Name", required: true },
      { name: "nature", type: "text", label: "Nature", required: true },
      { name: "yearCommenced", type: "text", label: "Year Commenced", placeholder: "e.g., 2023", required: true },
      { name: "certificate", type: "text", label: "Certificate", required: true },
      { name: "registrationLetterPdf", type: "document", label: "Registration Letter PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    INNOVATIONS: [
      { name: "innovationName", type: "text", label: "Innovation Name", required: true },
      { name: "nature", type: "text", label: "Nature", required: true },
      { name: "sanctionedAmount", type: "text", label: "Sanctioned Amount", required: true },
      { name: "receivedAmount", type: "text", label: "Received Amount", required: true },
      { name: "letterDate", type: "text", label: "Letter Date", placeholder: "YYYY-MM-DD", required: true },
      { name: "commercializationLetterPdf", type: "document", label: "Commercialization Letter PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
    BUSINESS_EXAMS: [
      { name: "examName", type: "text", label: "Exam Name", required: true },
      { name: "type", type: "text", label: "Type", required: true },
      { name: "activityName", type: "text", label: "Activity Name", required: true },
      { name: "proofPDF", type: "document", label: "Proof PDF", required: true },
      { name: "title", type: "text", label: "Achievement Title", required: true },
      { name: "description", type: "text", label: "Achievement Description", placeholder: "Be careful, this will be visible publicly if accepted", required: true },
    ],
  };

// Define form field configurations
const basicFormFields = [
    { name: "fullName", required: true },
    { name: "registrationNumber", required: true },
    { name: "mobileNumber", required: true },
    { name: "studentMail", required: true },
    { name: "userImage", required: true },
    { name: "achievementCategory", required: true },
    { name: "AchievementData", required: true },
];

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const achievementCategory = formData.get('achievementCategory') as string;

        // Validate basic fields
        for (const field of basicFormFields) {
            if (field.required && !formData.get(field.name)) {
                return NextResponse.json(
                    { error: `Missing required field: ${field.name}` },
                    { status: 400 }
                );
            }
        }

        // Parse AchievementData from JSON
        const achievementDataJson = formData.get('AchievementData') as string;
        // console.log('AchievementData:', achievementDataJson);
        let AchievementDATA: Record<string, any>;
        try {
            AchievementDATA = JSON.parse(achievementDataJson);
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid JSON format in AchievementData' },
                { status: 400 }
            );
        }

        // Validate achievement-specific fields
        const specificFields = achievementFormFields[achievementCategory];
        if (!specificFields) {
            return NextResponse.json(
                { error: `Invalid achievement type: ${achievementCategory}` },
                { status: 400 }
            );
        }
        for (const field of specificFields) {
            if (field.required && !AchievementDATA[field.name]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field.name}` },
                    { status: 400 }
                );
            }
        }

        // Process files and other fields
        const achievement: any = {};
        for (const field of [...basicFormFields, ...specificFields]) {
            const value = formData.get(field.name);
            if (value instanceof Blob) {
                const arrayBuffer = await value.arrayBuffer();
                achievement[field.name] = {
                    data: new Binary(new Uint8Array(arrayBuffer)),
                    contentType: value.type
                };
            } else if (field.name in AchievementDATA) {
                achievement[field.name] = AchievementDATA[field.name];
            } else {
                achievement[field.name] = value;
            }
        }

        // Validate mobile number
        const mobileNumberPattern = /^[0-9]{10}$/;
        if (!mobileNumberPattern.test(achievement.mobileNumber)) {
            return NextResponse.json(
                { error: 'Invalid mobile number. It must be a valid 10-digit phone number.' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await client.connect();
        const db = client.db('Wall-Of-Fame');
        const collection = db.collection('achievers');
        // const counters = db.collection('counters');
        // const SEQ = await counters.findOneAndUpdate(
        //     { _id: "orderCounter" as any },
        //     { $inc: { seq: 1 } },
        //     { returnDocument: "after", upsert: true }
        // );
        // if (!SEQ || !SEQ.value?.seq) {
        //     throw new Error('Failed to retrieve order sequence number');
        // }
        achievement.order = 20;
        achievement.submissionDate = new Date();
        achievement.approved = null;
        achievement.overAllTop10 = false;
        achievement.archived = false;

        // Insert the achievement
        const result = await collection.insertOne(achievement);

        // Send email notification
        EmailService.sendEmail(
            "vedic20052005@gmail.com",//change to category based on mesh
            `Achievement approval for ${achievement.fullName}`,
            `<h1>Dear Professor,</h1>
            <p>One of your students, ${achievement.fullName}, has submitted an achievement for approval. Please review the details and provide your feedback.</p>
            <p><strong>Registration Number:</strong> ${achievement.registrationNumber}</p>
            <p><strong>Phone Number:</strong> +91 ${achievement.mobileNumber}</p>
            <p><strong>Achievement Type:</strong> ${achievementCategory}</p>
            <p><strong>Submission Date:</strong> ${achievement.submissionDate}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard">Click here</a> to approve or reject the achievement.</p>
            <p>Thank you!</p>`
        );

        return NextResponse.json({
            success: true,
            message: 'Achievement submitted successfully',
            documentId: result.insertedId
        });

    } catch (error: any) {
        console.error('Error submitting achievement:', error);
        return NextResponse.json(
            { error: 'Failed to submit achievement' },
            { status: 500 }
        );
    } finally {
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