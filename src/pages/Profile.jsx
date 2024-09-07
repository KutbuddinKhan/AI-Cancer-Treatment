import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const Profile = () => {
  const { user } = usePrivy();

  // Extract user details, use fallback for undefined values
  const email = user?.email?.address || "Email not available";
  const walletAddress = user?.wallet?.address || "Wallet not available";
  const creationDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Date not available";
  const hasAcceptedTerms = user?.hasAcceptedTerms ? "Yes" : "No";

  // Extract username from email or use a fallback
  const username = email.split('@')[0] || "User";


  return (
    <div className="flex flex-col items-center bg-mainBackgroundColor text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {/* Profile Header with username */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Hi {username}!</h1>
        <p className="text-sm text-gray-400">Account Information</p>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 bg-gray-950 sm:grid-cols-2 gap-4 w-full">
        <div className="bg-[#13131a] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Email Address</h2>
          <p className="text-gray-300">{email}</p>
        </div>

        <div className="bg-[#13131a] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Wallet Address</h2>
          <p className="text-gray-300">{walletAddress}</p>
        </div>

        <div className="bg-[#13131a] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Created At</h2>
          <p className="text-gray-300">{creationDate}</p>
        </div>

        <div className="bg-[#13131a] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Accepted Terms</h2>
          <p className="text-gray-300">{hasAcceptedTerms}</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;
