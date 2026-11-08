export type Achievement = {
  title: string;
  issuer: string;
  award: string;
  image?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Tagisan ng Talino CodeFest",
    issuer: "STI College Fairview",
    award: "Local Level Champion",
    image: "/codefest_certificate_local.png",
  },
  {
    title: "Tagisan ng Talino CodeFest",
    issuer: "STI College",
    award: "Cluster Level 2nd Runner-Up",
    image: "/codefest_certificate_cluster.png",
  },
];
