// Single source of truth for identity, links, resume and contact delivery.

export const profile = {
  name: "Aditya Kumar Jha",
  shortName: "Aditya Jha",
  roles: ["AI Engineer", "Full Stack Developer", "LLM Training: RL and SFT"],
  location: "Gurugram, India",
  email: "9aadityakumar12@gmail.com",
  phone: "+91 87100 75503",
  phoneHref: "tel:+918710075503",
  github: "https://github.com/Adityakumarjha087",
  linkedin: "https://www.linkedin.com/in/adityajha12/",
};

export const resumeUrl =
  "https://drive.google.com/file/d/1S0EN1rEbm6FSerPTyTaVxUBIAS2v1bMB/view?usp=sharing";

export const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

// Access key from https://web3forms.com. It is a public identifier and safe to
// ship in client code. While it is empty the contact form opens a pre-filled
// email draft instead of sending directly.
export const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
