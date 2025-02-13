// utils/generateOTP.ts
import { MongoClient, ObjectId } from 'mongodb';
import { Resend } from 'resend';

// Initialize Resend for email
const resend = new Resend(process.env.resendAPI); // Replace with your API key
if (!process.env.mongoURL) {
    throw new Error("Missing MONGO_URL in environment variables");
  }
const MONGODB_URI = process.env.mongoURL as string;

interface OTPDocument {
  _id?: ObjectId;
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  used?: boolean;
}

export class OTPService {
  private static generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async generateAndSendOTP(email: string): Promise<{ success: boolean; message: string }> {
    const client = new MongoClient(MONGODB_URI);

    try {
      await client.connect();
      console.log('connected');
      const db = client.db('Wall-Of-Fame');
      const otpCollection = db.collection<OTPDocument>('otps');
      console.log('connected to otp');

      // Generate new OTP
      const otp = this.generateCode();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 5 * 60000); // 5 minutes expiry

      // Remove any existing OTPs for this email
      await otpCollection.deleteMany({ email });

      // Store new OTP
      await otpCollection.insertOne({
        email,
        otp,
        createdAt: now,
        expiresAt,
        used: false
      });

      // Send email
      await resend.emails.send({
        from: 'send@vedicvarma.com',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verification Code</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
              <strong>${otp}</strong>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `
      });

      return {
        success: true,
        message: 'OTP sent successfully'
      };

    } catch (error) {
      console.error('Error generating/sending OTP:', error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    const client = new MongoClient(MONGODB_URI);

    try {
      await client.connect();
      const db = client.db('Wall-Of-Fame');
      const otpCollection = db.collection<OTPDocument>('otps');

      // Find the OTP document
      const otpDoc = await otpCollection.findOne({
        email,
        otp,
        used: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpDoc) {
        return {
          success: false,
          message: 'Invalid or expired OTP'
        };
      }

      // Mark OTP as used
      await otpCollection.updateOne(
        { _id: otpDoc._id },
        { $set: { used: true } }
      );

      return {
        success: true,
        message: 'OTP verified successfully'
      };

    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    } finally {
      await client.close();
    }
  }

  static async cleanupExpiredOTPs(): Promise<void> {
    const client = new MongoClient(MONGODB_URI);

    try {
      await client.connect();
      const db = client.db('Wall-Of-Fame');
      const otpCollection = db.collection<OTPDocument>('otps');

      // Remove expired OTPs
      await otpCollection.deleteMany({
        expiresAt: { $lt: new Date() }
      });

    } catch (error) {
      console.error('Error cleaning up OTPs:', error);
      throw error;
    } finally {
      await client.close();
    }
  }
}

// Helper function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Example usage in API route:
/*
// app/api/auth/generateOTP/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OTPService, isValidEmail } from '@/utils/generateOTP';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const result = await OTPService.generateAndSendOTP(email);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in OTP generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate OTP' },
      { status: 500 }
    );
  }
}
*/