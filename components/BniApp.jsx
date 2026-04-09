import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

// ═══════════════════════════════════════════
// REAL MEMBER DATA - BNI INSOMNIACS
// ═══════════════════════════════════════════
const MEMBERS = [
  { id:1, name:"A Syeeduddin", category:"Retail & Wholesale", specialty:"Retail/Wholesale Specialist" },
  { id:2, name:"Abhaysingh Chawan", category:"Event & Business Service", specialty:"Event & Business-Service Specialist" },
  { id:3, name:"Akshat Jain", category:"Manufacturing", specialty:"Furniture Manufacture" },
  { id:4, name:"Akshay Ramchandani", category:"Construction", specialty:"Renovations/Remodeling" },
  { id:5, name:"Akshay Revankar", category:"Transport & Shipping", specialty:"Transport & Shipping Specialist" },
  { id:6, name:"Amit Badlani", category:"Advertising & Marketing", specialty:"Printer - Offset" },
  { id:7, name:"Anand Bhaskar", category:"Consulting", specialty:"Management Consulting" },
  { id:8, name:"Ankit Bhansali", category:"Real Estate Services", specialty:"Real Estate Services Specialist" },
  { id:9, name:"Ankita Rao", category:"Architecture & Engineering", specialty:"Architect" },
  { id:10, name:"Anuj Malhotra", category:"Consulting", specialty:"Consulting Specialist" },
  { id:11, name:"Ashish Lalwani", category:"Real Estate Services", specialty:"Residential Real Estate - Sales" },
  { id:12, name:"Bharat Aidasani", category:"Travel", specialty:"Travel Agent - Outbound" },
  { id:13, name:"Bharat Karani", category:"Advertising & Marketing", specialty:"Advertising & Marketing Specialist" },
  { id:14, name:"Bhaskar Shah", category:"Computer & Programming", specialty:"Computer & Programming Specialist" },
  { id:15, name:"Bhawna Chopra", category:"Food & Beverage", specialty:"Food Services & Distributors" },
  { id:16, name:"Boman Parakh", category:"Construction", specialty:"Construction Specialist" },
  { id:17, name:"Chetan Shamji Thaleshwar", category:"Retail & Wholesale", specialty:"Fine Jewelry" },
  { id:18, name:"David Prabhu", category:"Automotives", specialty:"Automotive Specialist" },
  { id:19, name:"Deepak Bhagchandani", category:"Transport & Shipping", specialty:"Commercial Transportation" },
  { id:20, name:"Dharam Seth", category:"Employment Activities", specialty:"Employment Activities Specialist" },
  { id:21, name:"Emil Sunil George", category:"Legal & Accounting", specialty:"Legal Services - Commercial/Business" },
  { id:22, name:"Fariba Fattahi", category:"Health & Wellness", specialty:"Physiotherapist" },
  { id:23, name:"Fatma Siddiqui", category:"Event & Business Service", specialty:"Serviced Offices & Business Centre" },
  { id:24, name:"Garima Batra Juneja", category:"Real Estate Services", specialty:"Commercial Real Estate" },
  { id:25, name:"Girish Nathaney", category:"Advertising & Marketing", specialty:"Web Design & Development" },
  { id:26, name:"Govind Katara", category:"Advertising & Marketing", specialty:"Promotional Products" },
  { id:27, name:"Hakimuddin Saify", category:"Construction", specialty:"Construction Specialist" },
  { id:28, name:"Haresh Lalwani", category:"Finance & Insurance", specialty:"Residential Mortgages" },
  { id:29, name:"Hashem Mohamed Assaad", category:"Construction", specialty:"Builder/General Contractor" },
  { id:30, name:"Hemant Varandani", category:"Travel", specialty:"Travel Agent - Inbound" },
  { id:31, name:"Jacob Alex", category:"Food & Beverage", specialty:"Caterer" },
  { id:32, name:"Jai Satwani", category:"Construction", specialty:"Commercial/Retail Interior Design & Fitout" },
  { id:33, name:"Jasbir Bindra", category:"Legal & Accounting", specialty:"Legal & Accounting Specialist" },
  { id:34, name:"Jatin Sachdeva", category:"Health & Wellness", specialty:"Health & Wellness Specialist" },
  { id:35, name:"Jesika Menon", category:"Training & Coaching", specialty:"Learning Centre" },
  { id:36, name:"Karan Mulani", category:"Finance & Insurance", specialty:"General Insurance including Employee Benefits" },
  { id:37, name:"Leena Jayachandran", category:"Training & Coaching", specialty:"Sales Training/Coach" },
  { id:38, name:"Lijo Ittoop", category:"Advertising & Marketing", specialty:"Social Media" },
  { id:39, name:"Madhu Pallath", category:"Computer & Programming", specialty:"Computer & Programming Specialist" },
  { id:40, name:"Madhur Gupta", category:"Personal Services", specialty:"Personal Services Specialist" },
  { id:41, name:"Mahrukh Kazmi", category:"Legal & Accounting", specialty:"Intellectual Property Law" },
  { id:42, name:"Manoharan Chirakkal", category:"Computer & Programming", specialty:"Computer Networks & AMC" },
  { id:43, name:"Manoj Sureka", category:"Legal & Accounting", specialty:"Legal & Accounting Specialist" },
  { id:44, name:"Mariam Wehbi", category:"Legal & Accounting", specialty:"Taxation" },
  { id:45, name:"Mitun De Sarkar", category:"Health & Wellness", specialty:"Nutritionist" },
  { id:46, name:"Mohamed Faisal Ibrahimkutty", category:"Legal & Accounting", specialty:"Offshore Company Set up" },
  { id:47, name:"Mohit Sharma", category:"Finance & Insurance", specialty:"Wealth Management" },
  { id:48, name:"Mufaddal Boriyawala", category:"Retail & Wholesale", specialty:"Furniture Sales Commercial & Office" },
  { id:49, name:"Muhammad Salman", category:"Health & Wellness", specialty:"Personal Trainer - Fitness" },
  { id:50, name:"Mukeshkumar Ramani", category:"Health & Wellness", specialty:"Medical Services" },
  { id:51, name:"Muneer Samnani", category:"Training & Coaching", specialty:"Training & Coaching Specialist" },
  { id:52, name:"Nadeem Rasheed", category:"Retail & Wholesale", specialty:"Construction Products Retail" },
  { id:53, name:"Nitin Gupta", category:"Consulting", specialty:"Business Consulting" },
  { id:54, name:"Parichay Swarup", category:"Advertising & Marketing", specialty:"Brand Consultancy" },
  { id:55, name:"Paul Wesley", category:"Advertising & Marketing", specialty:"Television Advertising" },
  { id:56, name:"Peter Rodrigues", category:"Construction", specialty:"Construction Specialist" },
  { id:57, name:"Poonam Dabur", category:"Employment Activities", specialty:"Human Resources Consultancy" },
  { id:58, name:"Punit Thawani", category:"Health & Wellness", specialty:"General Dentist" },
  { id:59, name:"Rahul Datta", category:"Event & Business Service", specialty:"Corporate Events" },
  { id:60, name:"Rajesh Lobo", category:"Automotives", specialty:"Auto/Car Repair" },
  { id:61, name:"Rajesh Mirchandani", category:"Finance & Insurance", specialty:"Financial Planning & Personal Life Insurance" },
  { id:62, name:"Rajesh Pereira", category:"Event & Business Service", specialty:"Sound/Lighting/Staging" },
  { id:63, name:"Rakesh Pardasani", category:"Legal & Accounting", specialty:"Audit & Assurance" },
  { id:64, name:"Ranjeet Dang", category:"Retail & Wholesale", specialty:"Retail/Wholesale Specialist" },
  { id:65, name:"Rashida Malik Bathija", category:"Advertising & Marketing", specialty:"Advertising & Marketing Specialist" },
  { id:66, name:"Ritesh Rohra", category:"Retail & Wholesale", specialty:"Hardware Supplies" },
  { id:67, name:"Rutuja Marfatia", category:"Advertising & Marketing", specialty:"Public Relation" },
  { id:68, name:"Sachin Gupta", category:"Advertising & Marketing", specialty:"Search Engine Optimisation" },
  { id:69, name:"Sachin Singhal", category:"Personal Services", specialty:"Wedding Planner" },
  { id:70, name:"Sahil Gupta", category:"Advertising & Marketing", specialty:"Videographer/Film Producer" },
  { id:71, name:"Sanjay Nagdev", category:"Automotives", specialty:"Auto/Car Rental/Leasing" },
  { id:72, name:"Sanket Jain", category:"Transport & Shipping", specialty:"Shuttle/Limousine Service" },
  { id:73, name:"Satyanarayan Karan", category:"Retail & Wholesale", specialty:"Retail/Wholesale Specialist" },
  { id:74, name:"Saud Usman", category:"Retail & Wholesale", specialty:"Florist" },
  { id:75, name:"Saurabh Shetye", category:"Art & Entertainment", specialty:"Musicians" },
  { id:76, name:"Shahem Sabbagh", category:"Animals", specialty:"Veterinarian" },
  { id:77, name:"Shiva Purswani", category:"Retail & Wholesale", specialty:"Custom Apparel & Uniforms" },
  { id:78, name:"Shubhi Biju", category:"Architecture & Engineering", specialty:"Landscape Design & Contracting" },
  { id:79, name:"Simran Samtani", category:"Legal & Accounting", specialty:"Book Keeping & Out-Sourced CFO Services" },
  { id:80, name:"Sneha Bhatia", category:"Food & Beverage", specialty:"Cakes & Pastries" },
  { id:81, name:"Steve Cardoz", category:"Retail & Wholesale", specialty:"Curtains/Blinds" },
  { id:82, name:"Sumesh Wadhwa", category:"Manufacturing", specialty:"Manufacturing Specialist" },
  { id:83, name:"Sunil Gidhwani", category:"Real Estate Services", specialty:"Cleaning Service" },
  { id:84, name:"Sunil Padmanabhan", category:"Advertising & Marketing", specialty:"Advertising & Marketing Specialist" },
  { id:85, name:"Surjit Singh Namli", category:"Architecture & Engineering", specialty:"Residential Interior Design & Furniture" },
  { id:86, name:"Trupti Nilesh Rele", category:"Retail & Wholesale", specialty:"Art Dealer/Gallery Owner" },
  { id:87, name:"Umang Bhartia", category:"Transport & Shipping", specialty:"Courier Delivery Service" },
  { id:88, name:"Veena Muralidharan", category:"Transport & Shipping", specialty:"Freight Forwarding/Logistics" },
  { id:89, name:"Zankhana Mistry", category:"Health & Wellness", specialty:"Health & Wellness Services" },
];

const CATEGORIES = [...new Set(MEMBERS.map(m => m.category))].sort();

const INITIAL_ASKS = [
  { id: 1, memberId: 56, memberName: "Peter Rodrigues", askType: "specific_person", targetName: "Pallavi Dean", targetCompany: "Roar", targetCategory: "Architecture & Engineering", targetRole: "", notes: "Interior design project lead", date: "2026-03-10", status: "open" },
  { id: 2, memberId: 62, memberName: "Rajesh Pereira", askType: "specific_company", targetName: "", targetCompany: "Pixl Global", targetCategory: "Advertising & Marketing", targetRole: "", notes: "AV and staging partnership", date: "2026-03-10", status: "open" },
  { id: 3, memberId: 14, memberName: "Bhaskar Shah", askType: "general_role", targetName: "", targetCompany: "", targetCategory: "Computer & Programming", targetRole: "CFOs of companies looking for ERP solutions", notes: "Clay ERP implementation", date: "2026-03-10", status: "open" },
  { id: 4, memberId: 32, memberName: "Jai Satwani", askType: "general_role", targetName: "", targetCompany: "", targetCategory: "Construction", targetRole: "Hotel and restaurant owners planning renovations", notes: "Commercial fitout projects", date: "2026-03-03", status: "open" },
  { id: 5, memberId: 47, memberName: "Mohit Sharma", askType: "general_role", targetName: "", targetCompany: "", targetCategory: "Finance & Insurance", targetRole: "Business owners with AED 500K+ in savings", notes: "Wealth management consultation", date: "2026-03-03", status: "open" },
];

const STATUS_COLORS = {
  registered: { bg: "#EEF2FF", text: "#4338CA", label: "Registered" },
  called: { bg: "#FEF3C7", text: "#92400E", label: "Called" },
  confirmed: { bg: "#D1FAE5", text: "#065F46", label: "Confirmed" },
  attended: { bg: "#DBEAFE", text: "#1E40AF", label: "Attended" },
  oriented: { bg: "#EDE9FE", text: "#5B21B6", label: "Oriented" },
  applied: { bg: "#FCE7F3", text: "#9D174D", label: "Applied" },
  joined: { bg: "#D1FAE5", text: "#065F46", label: "Joined!" },
  declined: { bg: "#FEE2E2", text: "#991B1B", label: "Declined" },
  noshow: { bg: "#F3F4F6", text: "#6B7280", label: "No-Show" },
};

const INITIAL_VISITORS = [
  // ── Previous meetings ──
  { id: 4, name: "David Chen", business: "IT Solutions Provider", phone: "+971 56 321 0987", email: "david@example.com", invitedBy: "Bhaskar Shah", status: "attended", callNotes: "Has 50+ business cards", category: "Computer & Programming", specialty: "IT Solutions", seatAssignment: "Next to Manoharan (Networks)", followUpResponse: "questions", date: "2026-03-10", bio: null },
  { id: 5, name: "Amina Yusuf", business: "Legal Consultancy", phone: "+971 54 654 3210", email: "amina@example.com", invitedBy: "Emil Sunil George", status: "applied", callNotes: "Returning visitor, very engaged", category: "Legal & Accounting", specialty: "Corporate Law", seatAssignment: "Next to Mahrukh (IP Law)", followUpResponse: "ready", date: "2026-03-10", bio: null },
  // ── Tomorrow's meeting — 2026-04-08 ──
  { id: 10, name: "Ram Bahin (Substitute)", business: "Paparazzi House", phone: "050 8500750", email: "Director@paparazzi.house", invitedBy: "Anand Bhaskar", status: "confirmed", callNotes: "Substitute visitor", category: "Training & Coaching", specialty: "Business Training / Coach", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
  { id: 11, name: "Shahnawaz", business: "Dimos Café & Restaurant", phone: "055 8691155", email: "dimoscafeandrestaurant@gmail.com", invitedBy: "Ankita Rao", status: "called", callNotes: "Was busy. Details sent. Visit to be confirmed.", category: "Food & Beverage", specialty: "Restaurant / Café", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
  { id: 12, name: "Kapardhi Dhavala", business: "Property Maintainace", phone: "056 6817669", email: "kapardhi.dhavala@spacemanager.ae", invitedBy: "Ankita Rao", status: "registered", callNotes: "No. not reachable — Ankita informed.", category: "Construction", specialty: "Property Maintenance", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
  { id: 13, name: "Kevin Monteiro", business: "Voxtel Communication", phone: "055 1226166", email: "kevin@voxtelme.com", invitedBy: "", status: "registered", callNotes: "No. not reachable or constantly busy.", category: "Computer & Programming", specialty: "IT Consultants / Communication", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
  { id: 14, name: "Varaprasad SN", business: "Optculture", phone: "052 9045457", email: "varaprasad@optculture.com", invitedBy: "Madhu Pallath", status: "confirmed", callNotes: "Confirmed. Details sent.", category: "Advertising & Marketing", specialty: "Customer Loyalty & Engagement", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
  { id: 15, name: "Kanchan", business: "KLIPIT", phone: "052 254 6953", email: "kanchan.magaji@klipit.co", invitedBy: "Madhu Pallath", status: "registered", callNotes: "No. not reachable. Madhu informed.", category: "Advertising & Marketing", specialty: "Digital Reimbursement Platform", seatAssignment: "", followUpResponse: null, date: "2026-04-08", bio: null },
];

const PRINT_STYLE = `
@media print {
  body * { visibility: hidden !important; }
  #bni-print-area, #bni-print-area * { visibility: visible !important; }
  #bni-print-area {
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #fff !important;
    z-index: 99999 !important;
  }
  @page { size: A4 landscape; margin: 12mm 14mm; }
}
`;

// ═══════════════════════════════════════════
// AI MATCHING ENGINE
// ═══════════════════════════════════════════
function findMatches(visitor, asks, members) {
  const matches = [];
  const vCat = (visitor.category || "").toLowerCase();
  const vSpec = (visitor.specialty || "").toLowerCase();
  const vBiz = (visitor.business || "").toLowerCase();
  const vName = (visitor.name || "").toLowerCase();

  asks.filter(a => a.status === "open").forEach(ask => {
    let score = 0;
    let reason = "";
    const aCat = (ask.targetCategory || "").toLowerCase();
    const aRole = (ask.targetRole || "").toLowerCase();
    const aCompany = (ask.targetCompany || "").toLowerCase();
    const aName = (ask.targetName || "").toLowerCase();

    if (ask.askType === "specific_person" && aName && vName.includes(aName.split(" ")[0].toLowerCase())) {
      score = 100; reason = `Exact person match: ${ask.memberName} is looking for ${ask.targetName}`;
    } else if (ask.askType === "specific_company" && aCompany && vBiz.toLowerCase().includes(aCompany.toLowerCase())) {
      score = 95; reason = `Company match: ${ask.memberName} is looking for someone from ${ask.targetCompany}`;
    } else if (aCat && vCat === aCat) {
      score = 70; reason = `Category match: ${ask.memberName} is looking for ${ask.targetRole || ask.targetCategory}`;
      if (aRole && (vSpec.includes(aRole.split(" ")[0].toLowerCase()) || vBiz.includes(aRole.split(" ")[0].toLowerCase()))) {
        score = 85; reason = `Strong match: ${ask.memberName} is looking for "${ask.targetRole}" — visitor's business aligns`;
      }
    }
    if (score > 0) matches.push({ type: "ask", score, reason, member: members.find(m => m.id === ask.memberId), ask });
  });

  members.filter(m => m.category.toLowerCase() === vCat).forEach(m => {
    if (!matches.find(mt => mt.member?.id === m.id)) {
      matches.push({ type: "contact_sphere", score: 50, reason: `Contact Sphere: ${m.name} (${m.specialty}) is in the same category`, member: m });
    }
  });

  return matches.sort((a, b) => b.score - a.score);
}

// ═══════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════
function Badge({ bg, text, label }) {
  return <span style={{ background: bg, color: text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
}
function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.registered;
  return <Badge bg={s.bg} text={s.text} label={s.label} />;
}
function Card({ children, style, onClick }) {
  return <div onClick={onClick} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 16, ...style, cursor: onClick ? "pointer" : "default" }}>{children}</div>;
}
function StatCard({ label, value, sub, color }) {
  return <Card style={{ flex: 1, minWidth: 130 }}>
    <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: color || "#111", lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{sub}</div>}
  </Card>;
}

// ═══════════════════════════════════════════
// AI VISITOR INTELLIGENCE COMPONENT
// ═══════════════════════════════════════════
function VisitorIntelligence({ visitor, onBioSaved }) {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState(visitor.bio || null);
  const [error, setError] = useState(null);

  const generateBio = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a BNI chapter intelligence assistant helping the Visitor Host prepare warm, specific introductions for BNI Insomniacs Dubai.

Research this visitor and write a concise VIP briefing card. Use your knowledge of this business/industry to make it specific and useful — not generic.

Visitor Name: ${visitor.name}
Business Name: ${visitor.business}
Industry: ${visitor.category} — ${visitor.specialty}
Email: ${visitor.email || "not provided"}
Invited by BNI member: ${visitor.invitedBy || "walk-in"}
Call notes: ${visitor.callNotes || "None"}

Write a briefing in this exact JSON structure (no markdown, pure JSON):
{
  "headline": "One sharp sentence describing who they are and what they do — make it vivid and specific to their actual business, not generic",
  "businessSnapshot": "2-3 sentences about this specific business (${visitor.business}), their likely services, target clients, and how they operate in Dubai/UAE market",
  "conversationStarters": ["specific opener 1 relevant to their actual business", "specific opener 2 that references their industry context in UAE", "specific opener 3 about their growth or challenges"],
  "whatTheyNeed": "What business challenges or referrals someone running ${visitor.business} in the ${visitor.specialty} space likely needs — be specific",
  "whyBNI": "One compelling sentence on why BNI specifically benefits ${visitor.business} — mention referral potential from relevant BNI categories",
  "introScript": "A warm 2-sentence introduction the Visitor Host could say when introducing ${visitor.name} from ${visitor.business} to a BNI member. Make it specific to their business.",
  "linkedinTip": "Exact search string to use on LinkedIn or Google to find ${visitor.name} at ${visitor.business} and what to look for"
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setBio(parsed);
      onBioSaved(visitor.id, parsed);
    } catch (e) {
      setError("Could not generate bio. Please try again.");
    }
    setLoading(false);
  };

  if (!bio && !loading) return (
    <button onClick={generateBio} style={{
      background: "linear-gradient(135deg, #1B2A4A, #8B1A1A)", color: "#fff",
      border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12,
      fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
    }}>
      ✨ Generate VIP Briefing
    </button>
  );

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 12, padding: "8px 0" }}>
      <div style={{ width: 16, height: 16, border: "2px solid #8B1A1A", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      Researching {visitor.name}...
    </div>
  );

  if (error) return <div style={{ color: "#991B1B", fontSize: 12 }}>{error} <button onClick={generateBio} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "#991B1B" }}>Retry</button></div>;

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1B2A4A 50%, #2D1515 100%)",
        borderRadius: 10, padding: 14, color: "#fff"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>✦ VIP Intelligence Briefing</div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{bio.headline}</div>
          </div>
          <button onClick={() => { setBio(null); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 10, color: "#94A3B8", cursor: "pointer" }}>↺ Refresh</button>
        </div>

        {/* Business snapshot */}
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#64748B", marginBottom: 4 }}>Business Snapshot</div>
          <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.6 }}>{bio.businessSnapshot}</div>
        </div>

        {/* Two column: What they need + Why BNI */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#64748B", marginBottom: 4 }}>What They Need</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.5 }}>{bio.whatTheyNeed}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#64748B", marginBottom: 4 }}>Why BNI for Them</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.5 }}>{bio.whyBNI}</div>
          </div>
        </div>

        {/* Conversation starters */}
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#64748B", marginBottom: 6 }}>💬 Conversation Starters</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {bio.conversationStarters?.map((cs, i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                <span style={{ color: "#8B1A1A", fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.5 }}>{cs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intro script — highlighted */}
        <div style={{ background: "rgba(139,26,26,0.25)", border: "1px solid rgba(139,26,26,0.4)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#F87171", marginBottom: 4 }}>🎤 Introduction Script</div>
          <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.6, fontStyle: "italic" }}>"{bio.introScript}"</div>
        </div>

        {/* LinkedIn tip */}
        <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
          <span style={{ fontSize: 10, color: "#60A5FA", flexShrink: 0 }}>🔍</span>
          <div style={{ fontSize: 10, color: "#60A5FA", lineHeight: 1.5 }}><strong>Research tip:</strong> {bio.linkedinTip}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SEAT PLANNER COMPONENT
// ═══════════════════════════════════════════
function SeatPlanner({ visitors, asks }) {
  const meetingVisitors = visitors.filter(v => v.date === "2026-04-08");
  const [seats, setSeats] = useState(() => {
    // Auto-assign visitors to the 6 visitor seats based on best matches
    const assigned = {};
    meetingVisitors.slice(0, 6).forEach((v, i) => {
      assigned[`V${i + 1}`] = v.id;
    });
    return assigned;
  });
  const [dragging, setDragging] = useState(null);
  const [hovering, setHovering] = useState(null);

  const autoAssign = () => {
    // Smart assignment: group visitors by category affinity with member neighbors
    const memberSeats = {
      M1: MEMBERS.find(m => m.category === "Finance & Insurance"),
      M2: MEMBERS.find(m => m.category === "Legal & Accounting"),
      M3: MEMBERS.find(m => m.category === "Advertising & Marketing"),
      M4: MEMBERS.find(m => m.category === "Construction"),
      M5: MEMBERS.find(m => m.category === "Health & Wellness"),
      M6: MEMBERS.find(m => m.category === "Real Estate Services"),
    };

    const newSeats = {};
    const assigned = new Set();

    // For each visitor seat, find best visitor to match adjacent members
    ["V1","V2","V3","V4","V5","V6"].forEach((seatKey, i) => {
      const adjacentMember = Object.values(memberSeats)[i];
      if (!adjacentMember) return;

      let bestVisitor = null;
      let bestScore = -1;

      meetingVisitors.forEach(v => {
        if (assigned.has(v.id)) return;
        const matches = findMatches(v, asks, MEMBERS);
        const memberMatch = matches.find(m => m.member?.id === adjacentMember.id);
        const catMatch = v.category === adjacentMember.category ? 60 : 0;
        const score = (memberMatch?.score || 0) + catMatch;
        if (score > bestScore) { bestScore = score; bestVisitor = v; }
      });

      if (!bestVisitor && meetingVisitors.length > 0) {
        bestVisitor = meetingVisitors.find(v => !assigned.has(v.id)) || null;
      }

      if (bestVisitor) {
        newSeats[seatKey] = bestVisitor.id;
        assigned.add(bestVisitor.id);
      }
    });

    setSeats(newSeats);
  };

  const handleDrop = (targetSeat) => {
    if (!dragging) return;
    setSeats(prev => {
      const next = { ...prev };
      // Find if dragging visitor is already seated
      const fromSeat = Object.entries(next).find(([, vid]) => vid === dragging)?.[0];
      const displaced = next[targetSeat];
      if (fromSeat) next[fromSeat] = displaced || null;
      next[targetSeat] = dragging;
      return next;
    });
    setDragging(null);
    setHovering(null);
  };

  const getVisitor = (seatKey) => meetingVisitors.find(v => v.id === seats[seatKey]);
  const unassigned = meetingVisitors.filter(v => !Object.values(seats).includes(v.id));

  // Category color mapping
  const catColor = (cat) => {
    const map = {
      "Finance & Insurance": "#1D4ED8",
      "Legal & Accounting": "#7C3AED",
      "Advertising & Marketing": "#D97706",
      "Construction": "#B45309",
      "Health & Wellness": "#059669",
      "Real Estate Services": "#0891B2",
      "Computer & Programming": "#6D28D9",
      "Transport & Shipping": "#374151",
      "Consulting": "#7C3AED",
      "Event & Business Service": "#BE185D",
      "Training & Coaching": "#15803D",
      "Travel": "#0369A1",
      "Food & Beverage": "#B91C1C",
      "Retail & Wholesale": "#92400E",
      "Architecture & Engineering": "#0F766E",
      "Manufacturing": "#6B21A8",
      "Personal Services": "#BE185D",
      "Automotives": "#374151",
      "Employment Activities": "#1E40AF",
    };
    return map[cat] || "#6B7280";
  };

  // The room layout — U-shape
  // Inner U visitor row: V1–V6 (6 seats across the bottom inside of the U)
  // Outer U member row: M1–M10 around the sides + bottom outer
  
  const visitorSeats = ["V1","V2","V3","V4","V5","V6"];
  
  // Select 10 representative members for the illustration
  const displayMembers = [
    MEMBERS.find(m => m.specialty === "Wealth Management"),
    MEMBERS.find(m => m.specialty === "Residential Mortgages"),
    MEMBERS.find(m => m.specialty === "General Insurance including Employee Benefits"),
    MEMBERS.find(m => m.specialty === "Commercial Real Estate"),
    MEMBERS.find(m => m.specialty === "Architect"),
    MEMBERS.find(m => m.specialty === "Social Media"),
    MEMBERS.find(m => m.specialty === "Search Engine Optimisation"),
    MEMBERS.find(m => m.specialty === "Commercial/Retail Interior Design & Fitout"),
    MEMBERS.find(m => m.specialty === "Builder/General Contractor"),
    MEMBERS.find(m => m.specialty === "Construction Specialist"),
  ].filter(Boolean);

  const SeatChip = ({ seatKey, isVisitor }) => {
    const v = isVisitor ? getVisitor(seatKey) : null;
    const m = !isVisitor ? displayMembers[parseInt(seatKey.replace("M","")) - 1] : null;
    const isOver = hovering === seatKey;

    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setHovering(seatKey); }}
        onDragLeave={() => setHovering(null)}
        onDrop={() => isVisitor && handleDrop(seatKey)}
        style={{
          width: isVisitor ? 90 : 82,
          minHeight: isVisitor ? 72 : 64,
          borderRadius: 8,
          border: isOver ? "2px dashed #8B1A1A" : isVisitor ? "2px solid #8B1A1A" : "2px solid #1B2A4A",
          background: isOver ? "#FFF1F1" : isVisitor ? (v ? "#FFF7F7" : "#FFF1F1") : (m ? "#EEF2FF" : "#F8FAFC"),
          padding: "6px 5px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
          position: "relative",
          cursor: isVisitor ? "default" : "default"
        }}
      >
        {/* Seat label */}
        <div style={{
          position: "absolute", top: 3, left: 5,
          fontSize: 8, fontWeight: 800, color: isVisitor ? "#8B1A1A" : "#1B2A4A", opacity: 0.6
        }}>{seatKey}</div>

        {isVisitor && v && (
          <>
            <div draggable onDragStart={() => setDragging(v.id)} style={{ cursor: "grab" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: catColor(v.category),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, color: "#fff", marginBottom: 3
              }}>
                {v.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
            </div>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "#111", textAlign: "center", lineHeight: 1.2 }}>
              {v.name.split(" ")[0]}
            </div>
            <div style={{ fontSize: 7.5, color: "#6B7280", textAlign: "center", lineHeight: 1.2, marginTop: 1 }}>
              {v.specialty || v.category}
            </div>
          </>
        )}

        {isVisitor && !v && (
          <div style={{ fontSize: 9, color: "#9CA3AF", textAlign: "center" }}>
            {isOver ? "Drop here" : "Empty"}
          </div>
        )}

        {!isVisitor && m && (
          <>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: catColor(m.category),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, color: "#fff", marginBottom: 3
            }}>
              {m.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#1B2A4A", textAlign: "center", lineHeight: 1.2 }}>
              {m.name.split(" ")[0]}
            </div>
            <div style={{ fontSize: 7, color: "#6B7280", textAlign: "center", lineHeight: 1.2, marginTop: 1 }}>
              {m.specialty?.split(" ").slice(0,2).join(" ")}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>🪑 Strategic Seat Planner</div>
          <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Drag visitors to swap seats. Inner U = visitor row (6 seats). Outer = member seats (10).</div>
        </div>
        <button onClick={autoAssign} style={{
          background: "linear-gradient(135deg, #1B2A4A, #8B1A1A)", color: "#fff",
          border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>⚡ Auto-Assign by Affinity</button>
      </div>

      {/* Room visual */}
      <Card style={{ padding: 20, background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        {/* Room label */}
        <div style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
          Conference Room — BNI Insomniacs
        </div>

        {/* Presenter / top of room */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div style={{ background: "#1B2A4A", color: "#fff", borderRadius: 8, padding: "6px 32px", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
            📋 PRESENTER / EDUCATION CHAIR
          </div>
        </div>

        {/* U-shape table */}
        <div style={{ position: "relative", margin: "0 auto", maxWidth: 680 }}>
          
          {/* Top member row — left arm of U */}
          <div style={{ display: "flex", gap: 6, justifyContent: "space-between", marginBottom: 6 }}>
            {[0,1,2,3,4].map(i => (
              <SeatChip key={`M${i+1}`} seatKey={`M${i+1}`} isVisitor={false} />
            ))}
          </div>

          {/* Table surface */}
          <div style={{
            background: "linear-gradient(135deg, #1B2A4A 0%, #243555 100%)",
            borderRadius: 12,
            padding: "10px 20px",
            margin: "0 4px",
            minHeight: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(27,42,74,0.3)",
            position: "relative",
            marginBottom: 6
          }}>
            <div style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
              ◈ CONFERENCE TABLE ◈
            </div>
            {/* Decorative lines */}
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 2, height: 30, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 2, height: 30, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
          </div>

          {/* Visitor row — inner U bottom */}
          <div style={{ background: "rgba(139,26,26,0.06)", borderRadius: 10, padding: "8px 4px", border: "1.5px dashed rgba(139,26,26,0.25)", marginBottom: 6 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "#8B1A1A", textAlign: "center", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
              ★ Visitor Row — Inner U (drag to rearrange)
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
              {visitorSeats.map(sKey => (
                <SeatChip key={sKey} seatKey={sKey} isVisitor={true} />
              ))}
            </div>
          </div>

          {/* Bottom member row — right arm of U */}
          <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
            {[5,6,7,8,9].map(i => (
              <SeatChip key={`M${i+1}`} seatKey={`M${i+1}`} isVisitor={false} />
            ))}
          </div>
        </div>

        {/* Entry marker */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F1F5F9", borderRadius: 20, padding: "4px 16px", fontSize: 10, color: "#6B7280", fontWeight: 600 }}>
            ↑ ENTRANCE / REGISTRATION TABLE ↑
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16, paddingTop: 12, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>Category Key:</div>
          {[...new Set([...meetingVisitors.map(v => v.category), ...displayMembers.map(m => m.category)])].filter(Boolean).slice(0, 6).map(cat => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: catColor(cat) }} />
              <span style={{ fontSize: 9, color: "#374151" }}>{cat}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Match analysis per visitor seat */}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📊 Seat-Level Match Analysis</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {visitorSeats.map(sKey => {
            const v = getVisitor(sKey);
            if (!v) return (
              <Card key={sKey} style={{ padding: 10, background: "#F9FAFB", border: "1.5px dashed #E5E7EB" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF" }}>{sKey} — Empty</div>
              </Card>
            );
            const topMatch = findMatches(v, asks, MEMBERS)[0];
            return (
              <Card key={sKey} style={{ padding: 10, borderLeft: `3px solid ${catColor(v.category)}` }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#6B7280" }}>{sKey}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#111", marginTop: 2 }}>{v.name.split(" ")[0]}</div>
                <div style={{ fontSize: 9, color: "#6B7280" }}>{v.specialty || v.category}</div>
                {topMatch && (
                  <div style={{ marginTop: 6, background: "#F0FDF4", borderRadius: 6, padding: "4px 6px" }}>
                    <div style={{ fontSize: 8.5, color: "#166534", fontWeight: 600 }}>
                      Best match: {topMatch.member?.name.split(" ")[0]}
                    </div>
                    <div style={{ fontSize: 8, color: "#4ADE80" }}>{topMatch.score}% — {topMatch.type === "ask" ? "★ Ask" : "Contact Sphere"}</div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Unassigned visitors */}
      {unassigned.length > 0 && (
        <Card style={{ marginTop: 12, background: "#FFF7ED", borderColor: "#F59E0B" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 8 }}>⚠️ Unassigned Visitors ({unassigned.length})</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {unassigned.map(v => (
              <div key={v.id} draggable onDragStart={() => setDragging(v.id)}
                style={{
                  background: catColor(v.category), color: "#fff",
                  borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600,
                  cursor: "grab", display: "flex", alignItems: "center", gap: 6
                }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>
                  {v.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                {v.name.split(" ")[0]}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#B45309", marginTop: 6 }}>Drag these into empty visitor seats above</div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// PRINT COMPONENTS
// ═══════════════════════════════════════════
function PrintBox({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ width: 13, height: 13, border: "1.5px solid #374151", borderRadius: 2, flexShrink: 0, background: "#fff", display: "inline-block" }} />
      {label && <span style={{ fontSize: 9, color: "#374151" }}>{label}</span>}
    </div>
  );
}

function PrintableVisitorList({ visitors, meetingDate, asks }) {
  const formatted = (() => {
    const d = new Date(meetingDate + "T00:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  })();

  const getTopMatches = (v) => findMatches(v, asks, MEMBERS).filter(m => m.score >= 50).slice(0, 2);
  const WALK_IN_ROWS = 3;   // ← blank rows for on-the-day walk-ins
  const SUBSTITUTE_ROWS = 8;

  // Column header font slightly larger too
  const TH = { padding: "8px 8px", textAlign: "left", fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3 };

  return (
    <div style={{ fontFamily: "'Arial', sans-serif", background: "#fff", color: "#111", padding: "18px 24px" }}>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #8B1A1A", paddingBottom: 10, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#8B1A1A", letterSpacing: -0.5 }}>BNI Insomniacs</div>
          <div style={{ fontSize: 13, color: "#374151", marginTop: 2 }}>Visitor Host Command Centre</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1B2A4A" }}>Weekly Visitor List</div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{formatted}</div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            {visitors.length} visitor{visitors.length !== 1 ? "s" : ""} registered &nbsp;•&nbsp;
            Printed: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* ── VISITOR TABLE ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "#1B2A4A", color: "#fff" }}>
            <th style={{ ...TH, width: 24 }}>#</th>
            <th style={{ ...TH, width: 48 }}>Arr.</th>
            <th style={{ ...TH, width: 40 }}>Paid</th>
            <th style={{ ...TH, width: "15%" }}>Visitor Name</th>
            <th style={{ ...TH, width: "16%" }}>Business</th>
            <th style={{ ...TH, width: "13%" }}>Category</th>
            <th style={{ ...TH, width: "11%" }}>Invited By</th>
            <th style={{ ...TH, width: "12%" }}>Phone</th>
            <th style={{ ...TH }}>BNI Matches — Introduce To</th>
          </tr>
        </thead>
        <tbody>
          {/* ── Registered visitors ── */}
          {visitors.map((v, i) => {
            const topMatches = getTopMatches(v);
            return (
              <tr key={v.id} style={{ background: i % 2 === 0 ? "#fff" : "#F7F8FB", borderBottom: "1px solid #D1D5DB", verticalAlign: "top" }}>
                <td style={{ padding: "9px 8px", color: "#9CA3AF", fontWeight: 700, fontSize: 12 }}>{i + 1}</td>
                <td style={{ padding: "9px 8px" }}><PrintBox /></td>
                <td style={{ padding: "9px 8px" }}><PrintBox /></td>
                <td style={{ padding: "9px 8px", fontWeight: 800, color: "#111", fontSize: 13 }}>
                  {v.name}
                  <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 400, marginTop: 2 }}>{STATUS_COLORS[v.status]?.label || v.status}</div>
                </td>
                <td style={{ padding: "9px 8px", color: "#374151", fontSize: 12 }}>{v.business}</td>
                <td style={{ padding: "9px 8px" }}>
                  <div style={{ fontWeight: 700, color: "#4338CA", fontSize: 11 }}>{v.category || "—"}</div>
                  <div style={{ color: "#6B7280", fontSize: 10, marginTop: 1 }}>{v.specialty || ""}</div>
                </td>
                <td style={{ padding: "9px 8px", color: "#374151", fontSize: 12 }}>{v.invitedBy || "—"}</td>
                <td style={{ padding: "9px 8px", color: "#374151", fontSize: 11 }}>{v.phone || "—"}</td>
                <td style={{ padding: "9px 8px" }}>
                  {topMatches.length === 0 ? (
                    <span style={{ color: "#9CA3AF", fontSize: 11 }}>—</span>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {topMatches.map((m, mi) => (
                        <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginTop: 3, background: m.score >= 90 ? "#EF4444" : m.score >= 70 ? "#F59E0B" : "#3B82F6" }} />
                          <div>
                            <span style={{ fontWeight: 800, fontSize: 11, color: "#111" }}>{m.member?.name}</span>
                            <span style={{ fontSize: 10, color: "#6B7280", marginLeft: 4 }}>{m.type === "ask" ? "★ Ask" : "Contact Sphere"}</span>
                            <div style={{ fontSize: 10, color: "#9CA3AF" }}>{m.member?.specialty}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}

          {/* ── Walk-in blank rows ── */}
          {Array.from({ length: WALK_IN_ROWS }).map((_, i) => (
            <tr key={"walkin-" + i} style={{ background: i % 2 === 0 ? "#FFFBF0" : "#FFF8E8", borderBottom: "1px solid #FDE68A" }}>
              <td style={{ padding: "12px 8px", color: "#D97706", fontWeight: 700, fontSize: 12 }}>{visitors.length + i + 1}</td>
              <td style={{ padding: "12px 8px" }}><PrintBox /></td>
              <td style={{ padding: "12px 8px" }}><PrintBox /></td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>
                <div style={{ fontSize: 9, color: "#D97706", fontWeight: 700, marginBottom: 2 }}>WALK-IN</div>
                <div style={{ height: 18 }} />
              </td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>&nbsp;</td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>&nbsp;</td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>&nbsp;</td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>&nbsp;</td>
              <td style={{ padding: "12px 8px", borderBottom: "1px dotted #FCD34D" }}>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── STATUS LEGEND ── */}
      {visitors.length > 0 && (
        <div style={{ display: "flex", gap: 12, marginTop: 8, paddingTop: 6, borderTop: "1px solid #E5E7EB", flexWrap: "wrap", alignItems: "center" }}>
          {Object.entries(visitors.reduce((acc, v) => { acc[v.status] = (acc[v.status] || 0) + 1; return acc; }, {})).map(([s, n]) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
              <span style={{ background: STATUS_COLORS[s]?.bg, color: STATUS_COLORS[s]?.text, padding: "2px 7px", borderRadius: 8, fontWeight: 700, fontSize: 10 }}>{STATUS_COLORS[s]?.label || s}</span>
              <span style={{ fontWeight: 700, color: "#374151" }}>{n}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: 10, color: "#9CA3AF" }}>
            ● Red = Ask match (90%+) &nbsp;● Amber = Strong (70%+) &nbsp;● Blue = Contact Sphere
          </div>
        </div>
      )}

      {/* ── SUBSTITUTE TABLE ── */}
      <div style={{ marginTop: 18, pageBreakInside: "avoid" }}>
        <div style={{ background: "#1B2A4A", color: "#fff", padding: "8px 12px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, borderRadius: "4px 4px 0 0" }}>
          Member Substitutes
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#F1F5F9" }}>
              {["#","BNI Member Name (Absent)","Substitute Name","Substitute Business / Company","Phone","Arrived","Paid"].map((h, i) => (
                <th key={i} style={{ padding: "7px 9px", textAlign: "left", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3, color: "#374151", border: "1px solid #D1D5DB" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: SUBSTITUTE_ROWS }).map((_, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8F9FC" }}>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB", color: "#9CA3AF", fontWeight: 700, textAlign: "center", fontSize: 12 }}>{i + 1}</td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB" }}>&nbsp;</td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB" }}>&nbsp;</td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB" }}>&nbsp;</td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB" }}>&nbsp;</td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB", textAlign: "center" }}><PrintBox /></td>
                <td style={{ padding: "11px 9px", border: "1px solid #E5E7EB", textAlign: "center" }}><PrintBox /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ marginTop: 14, paddingTop: 6, borderTop: "2px solid #8B1A1A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>BNI Insomniacs • Visitor Host Programme • Confidential</div>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>Givers Gain®</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════
const TABS = [
  { label: "Dashboard", icon: "📊" },
  { label: "Visitors", icon: "👥" },
  { label: "Asks", icon: "🎯" },
  { label: "AI Match", icon: "🤖" },
  { label: "Seat Planner", icon: "🪑" },
  { label: "Members", icon: "📇" },
  { label: "Follow-Up", icon: "📬" },
];

function DashboardTab({ visitors, asks }) {
  const thisWeek = visitors.filter(v => v.date === "2026-04-08");
  const attended = visitors.filter(v => ["attended","oriented","applied","joined"].includes(v.status)).length;
  const applied = visitors.filter(v => ["applied","joined"].includes(v.status)).length;
  const ratio = attended > 0 ? Math.round((applied / attended) * 100) : 0;
  const catCounts = {};
  MEMBERS.forEach(m => { catCounts[m.category] = (catCounts[m.category] || 0) + 1; });

  return <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <StatCard label="This Week" value={thisWeek.length} sub="Visitors registered" color="#4338CA" />
      <StatCard label="Members" value={MEMBERS.length} sub="BNI Insomniacs" color="#065F46" />
      <StatCard label="Open Asks" value={asks.filter(a => a.status === "open").length} sub="From members" color="#D97706" />
      <StatCard label="Closing Ratio" value={`${ratio}%`} sub={`${applied}/${attended}`} color="#9D174D" />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Card>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📋 7-Touchpoint Checklist</div>
        {["A. Invitation — Members registered visitors","B. Registration — Confirmations sent","C. Pre-Meeting Call — All visitors called","D. The Welcome — Greeter + Registration ready","E. Meeting Experience — Orientation Host briefed","F. Visitor Interest — VO slides, ask 'Would you like to join?'","G. Follow-Up — Call within 2 hrs, 3-Response ready"].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 12, color: "#374151" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: "2px solid #D1D5DB", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🏷️ Chapter Categories ({Object.keys(catCounts).length})</div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {Object.entries(catCounts).sort((a,b) => b[1]-a[1]).map(([cat, count]) => (
            <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 12, borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ color: "#374151" }}>{cat}</span>
              <span style={{ fontWeight: 700, color: "#6B7280" }}>{count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>;
}

// ═══════════════════════════════════════════
// VISITORS TAB — with AI Intelligence
// ═══════════════════════════════════════════
function VisitorsTab({ visitors, setVisitors, asks }) {
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [printDate, setPrintDate] = useState("2026-04-08");
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({ name: "", business: "", phone: "", email: "", invitedBy: "", category: "", specialty: "", date: "2026-04-08" });

  useEffect(() => {
    if (!document.getElementById("bni-spin-style")) {
      const style = document.createElement("style");
      style.id = "bni-spin-style";
      style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
      document.head.appendChild(style);
    }
  }, []);

  const [showPrintModal, setShowPrintModal] = useState(false);

  const allDates = [...new Set(visitors.map(v => v.date))].sort().reverse();
  const printVisitors = visitors.filter(v => v.date === printDate);

  const addVisitor = async () => {
    if (!form.name || !form.business) return;
    const { data } = await supabase.from('visitors').insert([{
      name: form.name, business: form.business, phone: form.phone,
      email: form.email, invited_by: form.invitedBy, category: form.category,
      specialty: form.specialty, date: form.date, status: 'registered',
      call_notes: '', seat_assignment: '', follow_up_response: null, bio: null
    }]).select();
    if (data?.[0]) setVisitors(p => [...p, { ...data[0], invitedBy: data[0].invited_by, callNotes: data[0].call_notes, seatAssignment: data[0].seat_assignment, followUpResponse: data[0].follow_up_response }]);
    setForm({ name: "", business: "", phone: "", email: "", invitedBy: "", category: "", specialty: "", date: "2026-04-08" });
    setShowForm(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('visitors').update({ status }).eq('id', id);
    setVisitors(p => p.map(v => v.id === id ? { ...v, status } : v));
  };
  const saveBio = async (id, bio) => {
    await supabase.from('visitors').update({ bio }).eq('id', id);
    setVisitors(p => p.map(v => v.id === id ? { ...v, bio } : v));
  };

  return <div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 15 }}>All Visitors ({visitors.length})</span>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ display: "flex", borderRadius: 8, border: "1px solid #D1D5DB", overflow: "hidden" }}>
          <button onClick={() => setViewMode("list")} style={{ padding: "7px 12px", fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", background: viewMode === "list" ? "#1B2A4A" : "#fff", color: viewMode === "list" ? "#fff" : "#6B7280" }}>☰ List</button>
          <button onClick={() => setViewMode("print")} style={{ padding: "7px 12px", fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", background: viewMode === "print" ? "#1B2A4A" : "#fff", color: viewMode === "print" ? "#fff" : "#6B7280" }}>🖨️ Print View</button>
        </div>
        {viewMode === "list" && (
          <button onClick={() => setShowForm(!showForm)} style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Register</button>
        )}
      </div>
    </div>

    {viewMode === "list" && <>
      {showForm && <Card style={{ marginBottom: 12, background: "#FEFCE8" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[["name","Full Name"],["business","Business"],["phone","Phone"],["email","Email"]].map(([k,l]) => (
            <div key={k}>
              <label style={{ fontSize: 10, fontWeight: 600 }}>{l}</label>
              <input value={form[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 10, fontWeight: 600 }}>Invited By</label>
            <select value={form.invitedBy} onChange={e => setForm(p => ({...p, invitedBy: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12 }}>
              <option value="">Select member...</option>
              {MEMBERS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 600 }}>Category</label>
            <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12 }}>
              <option value="">Select category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 600 }}>Specialty</label>
            <input value={form.specialty} onChange={e => setForm(p => ({...p, specialty: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 600 }}>Meeting Date</label>
            <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} />
          </div>
        </div>
        <button onClick={addVisitor} style={{ marginTop: 10, background: "#059669", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save</button>
      </Card>}

      {visitors.map(v => {
        const isExpanded = expandedId === v.id;
        const topMatch = findMatches(v, asks, MEMBERS)[0];
        return (
          <Card key={v.id} style={{ marginBottom: 8, padding: 12, border: v.bio ? "1px solid #C7D2FE" : "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{v.name}</div>
                  {v.bio && <span style={{ background: "#EEF2FF", color: "#4338CA", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>✦ Briefed</span>}
                  {topMatch && <span style={{ background: topMatch.score >= 70 ? "#FEF3C7" : "#DBEAFE", color: topMatch.score >= 70 ? "#92400E" : "#1E40AF", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>
                    → {topMatch.member?.name.split(" ")[0]}
                  </span>}
                </div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>{v.business} • {v.category || "—"}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>Invited by {v.invitedBy} • {v.date}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                <StatusBadge status={v.status} />
                <select value={v.status} onChange={e => updateStatus(v.id, e.target.value)} style={{ fontSize: 10, padding: "2px 4px", border: "1px solid #D1D5DB", borderRadius: 4 }}>
                  {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{STATUS_COLORS[s].label}</option>)}
                </select>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : v.id)}
                  style={{ background: isExpanded ? "#EEF2FF" : "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer", fontWeight: 600, color: "#4338CA" }}>
                  {isExpanded ? "▲" : "✨ Brief"}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div style={{ marginTop: 10, borderTop: "1px solid #F3F4F6", paddingTop: 10 }}>
                <VisitorIntelligence visitor={v} onBioSaved={saveBio} />
              </div>
            )}
          </Card>
        );
      })}
    </>}

    {viewMode === "print" && <>
      <Card style={{ marginBottom: 12, background: "#F0FDF4", borderColor: "#22C55E", padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#15803D", display: "block", marginBottom: 4 }}>📅 Meeting Date</label>
            <select value={printDate} onChange={e => setPrintDate(e.target.value)} style={{ padding: "6px 10px", border: "1px solid #BBF7D0", borderRadius: 8, fontSize: 12, background: "#fff", color: "#111", minWidth: 160 }}>
              {allDates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="date" value={printDate} onChange={e => setPrintDate(e.target.value)} style={{ marginLeft: 8, padding: "6px 8px", border: "1px solid #BBF7D0", borderRadius: 8, fontSize: 12, background: "#fff" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#166534" }}><strong>{printVisitors.length}</strong> visitor{printVisitors.length !== 1 ? "s" : ""} on this date</div>
          </div>
          <button onClick={() => setShowPrintModal(true)} style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", minWidth: 160 }}>
            🖨️ Open Print View
          </button>
        </div>
      </Card>
      <div style={{ border: "2px solid #E5E7EB", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
        <div style={{ background: "#374151", color: "#9CA3AF", fontSize: 10, padding: "5px 14px", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Preview — A4 Landscape</div>
        <div id="bni-print-area">
          <PrintableVisitorList visitors={printVisitors} meetingDate={printDate} asks={asks} />
        </div>
      </div>
    </>}

    {/* ── FULL-SCREEN PRINT MODAL ── */}
    {showPrintModal && (
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#fff", overflowY: "auto"
      }}>
        {/* Sticky instruction bar — hidden when printing */}
        <div className="no-print" style={{
          position: "sticky", top: 0, zIndex: 10000,
          background: "#1B2A4A", color: "#fff",
          padding: "10px 20px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12, flexWrap: "wrap",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>🖨️ Print-Ready View</span>
            <span style={{ fontSize: 12, color: "#93C5FD" }}>
              Press <kbd style={{ background: "#374151", border: "1px solid #4B5563", borderRadius: 4, padding: "1px 6px", fontFamily: "monospace", fontSize: 12 }}>Ctrl+P</kbd>
              &nbsp;(Windows) or <kbd style={{ background: "#374151", border: "1px solid #4B5563", borderRadius: 4, padding: "1px 6px", fontFamily: "monospace", fontSize: 12 }}>⌘+P</kbd>
              &nbsp;(Mac) → choose <strong style={{ color: "#FCD34D" }}>"Save as PDF"</strong> → set <strong style={{ color: "#FCD34D" }}>Layout: Landscape</strong>
            </span>
          </div>
          <button
            onClick={() => setShowPrintModal(false)}
            style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            ✕ Close
          </button>
        </div>

        {/* The printable content */}
        <div id="bni-modal-print-area">
          <PrintableVisitorList visitors={printVisitors} meetingDate={printDate} asks={asks} />
        </div>

        {/* Print styles: hide the top bar, only print the content */}
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { margin: 0 !important; }
            @page { size: A4 landscape; margin: 10mm 12mm; }
          }
        `}</style>
      </div>
    )}
  </div>;
}

function AsksTab({ asks, setAsks }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ memberId: "", askType: "general_role", targetName: "", targetCompany: "", targetCategory: "", targetRole: "", notes: "" });

  const addAsk = async () => {
    const member = MEMBERS.find(m => m.id === Number(form.memberId));
    if (!member) return;
    const { data } = await supabase.from('asks').insert([{
      member_id: member.id, member_name: member.name, ask_type: form.askType,
      target_name: form.targetName, target_company: form.targetCompany,
      target_category: form.targetCategory, target_role: form.targetRole,
      notes: form.notes, date: new Date().toISOString().split("T")[0], status: 'open'
    }]).select();
    if (data?.[0]) setAsks(p => [...p, { ...data[0], memberId: data[0].member_id, memberName: data[0].member_name, askType: data[0].ask_type, targetName: data[0].target_name, targetCompany: data[0].target_company, targetCategory: data[0].target_category, targetRole: data[0].target_role }]);
    setForm({ memberId: "", askType: "general_role", targetName: "", targetCompany: "", targetCategory: "", targetRole: "", notes: "" });
    setShowForm(false);
  };
const closeAsk = async (id) => {
    await supabase.from('asks').update({ status: 'fulfilled' }).eq('id', id);
    setAsks(p => p.map(a => a.id === id ? { ...a, status: 'fulfilled' } : a));
  };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <span style={{ fontWeight: 700, fontSize: 15 }}>Member Asks Database ({asks.length})</span>
      <button onClick={() => setShowForm(!showForm)} style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ New Ask</button>
    </div>

    <Card style={{ marginBottom: 12, background: "#EEF2FF", borderColor: "#818CF8" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#4338CA", marginBottom: 4 }}>🎯 How Asks Work</div>
      <div style={{ fontSize: 11, color: "#3730A3", lineHeight: 1.6 }}>
        Record member asks each week from their 60-second presentations. Asks can be:<br/>
        <strong>Specific Person</strong> — e.g. "Pallavi Dean from Roar" | <strong>Specific Company</strong> — e.g. "Pixl Global" | <strong>General Role</strong> — e.g. "CFOs of companies"
      </div>
    </Card>

    {showForm && <Card style={{ marginBottom: 12, background: "#FEFCE8" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <label style={{ fontSize: 10, fontWeight: 600 }}>Member</label>
          <select value={form.memberId} onChange={e => setForm(p => ({...p, memberId: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12 }}>
            <option value="">Select member...</option>
            {MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name} ({m.specialty})</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 10, fontWeight: 600 }}>Ask Type</label>
          <select value={form.askType} onChange={e => setForm(p => ({...p, askType: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12 }}>
            <option value="specific_person">Specific Person</option>
            <option value="specific_company">Specific Company</option>
            <option value="general_role">General Role / Type</option>
          </select>
        </div>
        {form.askType === "specific_person" && <>
          <div><label style={{ fontSize: 10, fontWeight: 600 }}>Person Name</label><input value={form.targetName} onChange={e => setForm(p => ({...p, targetName: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} placeholder="e.g. Pallavi Dean" /></div>
          <div><label style={{ fontSize: 10, fontWeight: 600 }}>Company</label><input value={form.targetCompany} onChange={e => setForm(p => ({...p, targetCompany: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} placeholder="e.g. Roar" /></div>
        </>}
        {form.askType === "specific_company" && <div style={{ gridColumn: "span 2" }}>
          <label style={{ fontSize: 10, fontWeight: 600 }}>Company Name</label>
          <input value={form.targetCompany} onChange={e => setForm(p => ({...p, targetCompany: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} placeholder="e.g. Pixl Global" />
        </div>}
        {form.askType === "general_role" && <div style={{ gridColumn: "span 2" }}>
          <label style={{ fontSize: 10, fontWeight: 600 }}>Role / Description</label>
          <input value={form.targetRole} onChange={e => setForm(p => ({...p, targetRole: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} placeholder="e.g. CFOs of companies for ERP solutions" />
        </div>}
        <div>
          <label style={{ fontSize: 10, fontWeight: 600 }}>Relevant Category</label>
          <select value={form.targetCategory} onChange={e => setForm(p => ({...p, targetCategory: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12 }}>
            <option value="">Select category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><label style={{ fontSize: 10, fontWeight: 600 }}>Notes</label><input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} style={{ width: "100%", padding: "5px 8px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 12, boxSizing: "border-box" }} /></div>
      </div>
      <button onClick={addAsk} style={{ marginTop: 10, background: "#059669", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save Ask</button>
    </Card>}

    {asks.map(a => <Card key={a.id} style={{ marginBottom: 8, padding: 12, opacity: a.status === "fulfilled" ? 0.5 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{a.memberName}</div>
          <div style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>
            {a.askType === "specific_person" && <span>🔍 Looking for: <strong>{a.targetName}</strong> {a.targetCompany && `from ${a.targetCompany}`}</span>}
            {a.askType === "specific_company" && <span>🏢 Looking for someone from: <strong>{a.targetCompany}</strong></span>}
            {a.askType === "general_role" && <span>👤 Looking for: <strong>{a.targetRole}</strong></span>}
          </div>
          <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{a.targetCategory} • {a.notes} • {a.date}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Badge bg={a.status === "open" ? "#FEF3C7" : "#D1FAE5"} text={a.status === "open" ? "#92400E" : "#065F46"} label={a.status === "open" ? "Open" : "Fulfilled"} />
          {a.status === "open" && <button onClick={() => closeAsk(a.id)} style={{ fontSize: 10, padding: "3px 8px", border: "1px solid #D1D5DB", borderRadius: 4, cursor: "pointer", background: "#fff" }}>✓</button>}
        </div>
      </div>
    </Card>)}
  </div>;
}

function AIMatchTab({ visitors, asks }) {
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const matches = selectedVisitor ? findMatches(selectedVisitor, asks, MEMBERS) : [];

  return <div>
    <Card style={{ marginBottom: 12, background: "#F5F3FF", borderColor: "#8B5CF6" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#5B21B6", marginBottom: 4 }}>🤖 AI Visitor-Member Matching</div>
      <div style={{ fontSize: 11, color: "#6D28D9", lineHeight: 1.6 }}>
        Select a visitor to see which members they should meet based on open asks, Contact Sphere category matches, and specialty relevance.
      </div>
    </Card>

    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Select a visitor:</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
      {visitors.map(v => (
        <button key={v.id} onClick={() => setSelectedVisitor(v)}
          style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: selectedVisitor?.id === v.id ? 700 : 400,
            background: selectedVisitor?.id === v.id ? "#8B1A1A" : "#fff",
            color: selectedVisitor?.id === v.id ? "#fff" : "#374151",
            border: `1px solid ${selectedVisitor?.id === v.id ? "#8B1A1A" : "#D1D5DB"}` }}>
          {v.name}
        </button>
      ))}
    </div>

    {selectedVisitor && <div>
      <Card style={{ marginBottom: 12, background: "#FFFBEB", borderColor: "#F59E0B" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedVisitor.name}</div>
            <div style={{ fontSize: 12, color: "#92400E" }}>{selectedVisitor.business}</div>
            <div style={{ fontSize: 11, color: "#B45309" }}>{selectedVisitor.category} • {selectedVisitor.specialty}</div>
          </div>
          <StatusBadge status={selectedVisitor.status} />
        </div>
      </Card>

      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🎯 Matches Found: {matches.length}</div>
      {matches.length === 0 && <div style={{ fontSize: 12, color: "#9CA3AF" }}>No matches found.</div>}
      {matches.map((m, i) => (
        <Card key={i} style={{ marginBottom: 8, padding: 12, borderLeft: `4px solid ${m.score >= 90 ? "#EF4444" : m.score >= 70 ? "#F59E0B" : "#3B82F6"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>
              {m.member?.name}
              <span style={{ fontSize: 11, fontWeight: 400, color: "#6B7280", marginLeft: 6 }}>{m.member?.specialty}</span>
            </div>
            <span style={{ background: m.score >= 90 ? "#FEE2E2" : m.score >= 70 ? "#FEF3C7" : "#DBEAFE", color: m.score >= 90 ? "#991B1B" : m.score >= 70 ? "#92400E" : "#1E40AF", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{m.score}% match</span>
          </div>
          <div style={{ fontSize: 12, color: "#374151" }}>{m.reason}</div>
          {m.type === "ask" && <div style={{ fontSize: 10, color: "#6B7280", marginTop: 4 }}>From ask: {m.ask.notes} ({m.ask.date})</div>}
          <div style={{ marginTop: 6 }}>
            <Badge bg="#EEF2FF" text="#4338CA" label={m.type === "ask" ? "📌 Open Ask Match" : "🔄 Contact Sphere"} />
          </div>
        </Card>
      ))}
      {matches.length > 0 && <Card style={{ marginTop: 12, background: "#F0FDF4", borderColor: "#22C55E" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#15803D", marginBottom: 4 }}>💡 Suggested Actions</div>
        <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.7 }}>
          {matches.filter(m => m.score >= 70).length > 0 && <>• Inform <strong>{matches.filter(m => m.score >= 70).map(m => m.member?.name).join(", ")}</strong> about this visitor before the meeting<br/></>}
          • Seat {selectedVisitor.name} next to: <strong>{matches[0]?.member?.name}</strong><br/>
          {matches.length > 1 && <>• Also introduce to: <strong>{matches.slice(1, 3).map(m => m.member?.name).join(", ")}</strong> during open networking</>}
        </div>
      </Card>}
    </div>}
  </div>;
}

function MembersTab() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const filtered = MEMBERS.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.specialty.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || m.category === filterCat;
    return matchSearch && matchCat;
  });

  return <div>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ flex: 1, padding: "7px 12px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 12 }} />
      <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ padding: "7px 8px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 12 }}>
        <option value="">All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>{filtered.length} members</div>
    <div style={{ maxHeight: 500, overflowY: "auto" }}>
      {filtered.map(m => (
        <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #F3F4F6", fontSize: 12 }}>
          <div>
            <div style={{ fontWeight: 600, color: "#111" }}>{m.name}</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>{m.specialty}</div>
          </div>
          <Badge bg="#F3F4F6" text="#374151" label={m.category} />
        </div>
      ))}
    </div>
  </div>;
}

function FollowUpTab({ visitors, setVisitors }) {
  const needsFollowUp = visitors.filter(v => ["attended","oriented"].includes(v.status));
  const genMsg = (v, type) => {
    const first = v.name.split(" ")[0];
    const msgs = {
      thankYou: `Hi ${first}, it was wonderful having you at BNI Insomniacs today!\n\nI hope you enjoyed meeting our members. I'd love to set up a 1-2-1 this week to learn more about your ${v.business} and see how I can refer people your way.\n\nWould tomorrow or Wednesday work?\n\n— [Your Name]`,
      ready: `That's fantastic, ${first}! Here's the application link: [link]\n\nHappy to walk you through it. Welcome to BNI Insomniacs!`,
      questions: `Completely understand, ${first}. I'd love to share how BNI Insomniacs has helped members grow their business. Can we grab a quick call?\n\nOur President would also love to connect.`,
      notNow: `No problem at all, ${first}. Thank you for visiting BNI Insomniacs.\n\nIs there any member you'd like me to connect you with? You're always welcome to visit again.`,
    };
    return msgs[type] || "";
  };
  const [msg, setMsg] = useState("");
  const [activeId, setActiveId] = useState(null);

  return <div>
    <Card style={{ marginBottom: 12, background: "#EEF2FF", borderColor: "#818CF8" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#4338CA", marginBottom: 4 }}>3-Response Follow-Up Framework</div>
      <div style={{ fontSize: 11, color: "#3730A3", lineHeight: 1.6 }}>
        <strong>1. Ready to apply</strong> → Send application link | <strong>2. More questions</strong> → Clarify with stories | <strong>3. Not now</strong> → Thank, offer connections
      </div>
    </Card>
    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Needs Follow-Up ({needsFollowUp.length})</div>
    {needsFollowUp.length === 0 && <div style={{ color: "#9CA3AF", fontSize: 12 }}>All caught up! ✅</div>}
    {needsFollowUp.map(v => <Card key={v.id} style={{ marginBottom: 10, padding: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{v.name} <span style={{ fontWeight: 400, fontSize: 11, color: "#6B7280" }}>{v.business}</span></div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
        {[["thankYou","💌 Thank You"],["ready","✅ Ready to Apply"],["questions","❓ More Questions"],["notNow","👋 Not Now"]].map(([k,l]) => (
          <button key={k} onClick={() => { setMsg(genMsg(v, k)); setActiveId(v.id); }} style={{ padding: "5px 10px", fontSize: 11, borderRadius: 6, border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer", fontWeight: 600 }}>{l}</button>
        ))}
      </div>
      {activeId === v.id && msg && <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 8, padding: 10, marginTop: 6 }}>
        <pre style={{ fontSize: 11, whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit", lineHeight: 1.5, color: "#374151" }}>{msg}</pre>
        <button onClick={() => navigator.clipboard?.writeText(msg)} style={{ marginTop: 6, background: "#4338CA", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 10, cursor: "pointer", fontWeight: 600 }}>📋 Copy</button>
      </div>}
    </Card>)}
  </div>;
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState(0);
  const [visitors, setVisitors] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data: visitorsData } = await supabase.from('visitors').select('*');
      const { data: asksData } = await supabase.from('asks').select('*');
      if (visitorsData) setVisitors(visitorsData.map(v => ({
        ...v,
        invitedBy: v.invited_by,
        callNotes: v.call_notes,
        seatAssignment: v.seat_assignment,
        followUpResponse: v.follow_up_response,
      })));
      if (asksData) setAsks(asksData.map(a => ({
        ...a,
        memberId: a.member_id,
        memberName: a.member_name,
        askType: a.ask_type,
        targetName: a.target_name,
        targetCompany: a.target_company,
        targetCategory: a.target_category,
        targetRole: a.target_role,
      })));
    };
    loadData();
  }, []);

  const tabs = [
    <DashboardTab visitors={visitors} asks={asks} />,
    <VisitorsTab visitors={visitors} setVisitors={setVisitors} asks={asks} />,
    <AsksTab asks={asks} setAsks={setAsks} />,
    <AIMatchTab visitors={visitors} asks={asks} />,
    <SeatPlanner visitors={visitors} asks={asks} />,
    <MembersTab />,
    <FollowUpTab visitors={visitors} setVisitors={setVisitors} />,
  ];

  return <div style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>
    <div style={{ background: "linear-gradient(135deg, #8B1A1A 0%, #1B2A4A 100%)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ color: "#fff", fontSize: 17, fontWeight: 800, letterSpacing: -0.5 }}>BNI Insomniacs</div>
        <div style={{ color: "#FFD4D4", fontSize: 10 }}>Visitor Host Command Centre • {MEMBERS.length} Members</div>
      </div>
      <div style={{ display: "flex", gap: 12, color: "#FFD4D4", fontSize: 11 }}>
        <span>👥 {visitors.filter(v => v.date === "2026-04-08").length} this week</span>
        <span>🎯 {asks.filter(a => a.status === "open").length} open asks</span>
      </div>
    </div>

    <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", display: "flex", overflowX: "auto", padding: "0 4px" }}>
      {TABS.map((t, i) => (
        <button key={i} onClick={() => setTab(i)} style={{
          padding: "10px 14px", border: "none", background: "none", cursor: "pointer",
          fontSize: 12, fontWeight: tab === i ? 700 : 500,
          color: tab === i ? "#8B1A1A" : "#6B7280",
          borderBottom: tab === i ? "3px solid #8B1A1A" : "3px solid transparent",
          whiteSpace: "nowrap",
        }}>{t.icon} {t.label}</button>
      ))}
    </div>

    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      {tabs[tab]}
    </div>
  </div>;
}
