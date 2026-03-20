import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  onboarded: boolean;
}

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  completeOnboarding: (data: Omit<UserProfile, "onboarded">) => void;
}

const defaultProfile: UserProfile = {
  name: "",
  birthDate: "",
  gender: "male",
  onboarded: false,
};

const UserProfileContext = createContext<UserProfileContextType>({
  profile: defaultProfile,
  setProfile: () => {},
  completeOnboarding: () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem("user_profile");
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
  }, [profile]);

  const completeOnboarding = (data: Omit<UserProfile, "onboarded">) => {
    setProfile({ ...data, onboarded: true });
  };

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, completeOnboarding }}>
      {children}
    </UserProfileContext.Provider>
  );
}
