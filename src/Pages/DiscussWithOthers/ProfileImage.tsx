import "./DiscussWithOthers.css";

interface ProfileImageProps {
  email: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ email }) => {
  // Get the first two characters of the email
  const initials = email.substring(0, 2).toUpperCase();
  const firstName = email.substring(0, 1).toUpperCase();

  return (
    <div
      className={
        firstName == "A"
          ? "profile-imageA"
          : firstName == "B"
          ? "profile-imageB"
          : firstName == "C"
          ? "profile-imageC"
          : firstName == "D"
          ? "profile-imageD"
          : firstName == "E"
          ? "profile-imageE"
          : firstName == "F"
          ? "profile-imageF"
          : firstName == "G"
          ? "profile-imageG"
          : firstName == "H"
          ? "profile-imageH"
          : firstName == "I"
          ? "profile-imageI"
          : firstName == "J"
          ? "profile-imageJ"
          : firstName == "K"
          ? "profile-imageK"
          : firstName == "L"
          ? "profile-imageL"
          : firstName == "M"
          ? "profile-imageM"
          : firstName == "N"
          ? "profile-imageN"
          : firstName == "O"
          ? "profile-imageO"
          : firstName == "P"
          ? "profile-imageP"
          : firstName == "Q"
          ? "profile-imageQ"
          : firstName == "R"
          ? "profile-imageR"
          : firstName == "S"
          ? "profile-imageS"
          : firstName == "T"
          ? "profile-imageT"
          : firstName == "U"
          ? "profile-imageU"
          : firstName == "V"
          ? "profile-imageV"
          : firstName == "W"
          ? "profile-imageW"
          : firstName == "X"
          ? "profile-imageX"
          : firstName == "Y"
          ? "profile-imageY"
          : firstName == "Z"
          ? "profile-imageZ"
          : ""
      }
    >
      <span>{initials}</span>
    </div>
  );
};

export default ProfileImage;
