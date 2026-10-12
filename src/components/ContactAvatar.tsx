interface ContactAvatarProps {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function ContactAvatar({ name, color = "#e5e7eb", size = "md" }: ContactAvatarProps) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <span className={`avatar avatar-${size}`} style={{ backgroundColor: color }} aria-label={name}>{initials}</span>;
}
