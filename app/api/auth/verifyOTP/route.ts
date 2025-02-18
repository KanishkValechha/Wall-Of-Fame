// Route to verify OTP
import { NextRequest, NextResponse } from 'next/server';
import { OTPService, isValidEmail } from '@/app/utils/EmailServices';

export async function PUT(req: NextRequest) {
    try {
      const { email, otp } = await req.json();
  
      if (!email || !isValidEmail(email) || !otp) {
        return NextResponse.json(
          { success: false, message: 'Invalid email or OTP' },
          { status: 400 }
        );
      }
  
      const result = await OTPService.verifyOTP(email, otp);
      return NextResponse.json(result);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to verify OTP' },
        { status: 500 }
      );
    }
  }
  