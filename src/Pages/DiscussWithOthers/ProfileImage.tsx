import React from 'react';
import './DiscussWithOthers.css'

interface ProfileImageProps {
  email: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ email }) => {
  // Get the first two characters of the email
  const initials = email.substring(0, 2).toUpperCase();

  console.log(initials)

  return (
    <div className="profile-image">
      <span>{initials}</span>
    </div>
  );
};

export default ProfileImage;