/**
 * AI Signature Verification System — Final Year Project.
 * Screenshots public/projects/ai-signature/ mein hain.
 */

const IMG = "/projects/ai-signature"

export const aiProject = {
  name: "AI Signature Verification System",
  kind: "Final Year Project · Forgery detection for banks",
  blurb:
    "My final year project, built to catch forged signatures before a bank transaction goes through. A cashier verifies the customer through an authorization slip check and an email OTP, then the system compares the signature on the document with the one on record. The transaction only proceeds when the match is above 70%.",
  points: [
    "Five-step verification flow: customer, document type, slip check, signature upload, OTP",
    "Signature comparison service in Python using OpenCV preprocessing and SSIM scoring",
    "Every attempt is logged with cashier, customer, time and matching percentage",
    "Separate dashboards for admin, manager and cashier",
  ],
  stack: ["React", "Node.js", "Express", "MongoDB", "Python", "Flask", "OpenCV", "scikit-image"],
  live: "https://smart-signature-matching.netlify.app/",
  github: "https://github.com/NOUREENSIRAJ/AI-Based-Signature-Verification-System",
  cover: `${IMG}/01-select-customer.png`,

  caseStudy: {
    problem:
      "In most bank branches, cheques and withdrawal forms are still checked by eye. The cashier looks at the signature, compares it with the one on file and makes a call. A careful forgery can get past a busy cashier, the result depends on who is checking, and there is rarely any record of how the decision was made.",
    approach:
      "I broke verification into five steps so that a signature is never the only check. The cashier selects the customer, picks the document type and verifies the authorization slip using the Slip ID and CNIC, or proceeds as the account owner if they are present. After the signature is uploaded, an OTP is sent to the customer's Gmail. Only once the OTP is confirmed does the system compare signatures, and anything under a 70% match is rejected.",
    matching:
      "The comparison runs as a separate Flask service. Both signature images are converted to grayscale, resized to the same dimensions, smoothed with a Gaussian blur and binarized with Otsu thresholding, so that pen colour, lighting and scan quality matter less. The two images are then scored with SSIM (structural similarity), which gives the matching percentage shown to the cashier and saved in the logs.",
    steps: [
      { title: "Select user", text: "Search the customer by name." },
      { title: "Document type", text: "Choose the document being processed, such as a cheque." },
      { title: "Slip verification", text: "Match Slip ID and CNIC to an active authorization, or proceed as account owner." },
      { title: "Upload signature", text: "Upload the signature from the document." },
      { title: "OTP verification", text: "Customer confirms the OTP sent to their Gmail." },
    ],
    flowchart: `${IMG}/flowchart.png`,
    admin: [
      { src: `${IMG}/03-login.png`, caption: "Login screen" },
      { src: `${IMG}/04-dashboard.png`, caption: "Admin dashboard with branches, cashiers, customers and usage growth" },
      { src: `${IMG}/05-branches.png`, caption: "Branch management, each branch with its manager" },
    ],
    manager: [
      { src: `${IMG}/06-logs.png`, caption: "Manager view of verification logs, green passed and red failed" },
      { src: `${IMG}/07-log-details.png`, caption: "A single log with both signatures, matching percentage and customer details" },
    ],
    cashier: [
      { src: `${IMG}/02-slip-verification.png`, caption: "Cashier verifying the authorization slip with Slip ID and CNIC" },
    ],
    customer: [
      { src: `${IMG}/01-select-customer.png`, caption: "Searching and selecting the customer to verify" },
    ],
  },
}
