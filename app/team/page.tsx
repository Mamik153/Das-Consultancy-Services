import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const description = `Meet the people behind ${site.name}, led by founder ${site.founder}.`;

export const metadata: Metadata = {
  title: "Our team",
  description,
  alternates: { canonical: "/team" },
  openGraph: { title: `Our team | ${site.name}`, description, url: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Our team", path: "/team" }]))} />
      <section className="team-page page-shell">
        <header className="team-intro" data-motion-group>
          <h1>The people behind<br /><span>your next build.</span></h1>
          <div><p>Good software starts with a good working relationship. Get to know the people behind Das Software Consultancy.</p><Link href="/contact" className="text-link">Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </header>
        <ul className="team-list" data-motion-group aria-label="Team members">
          {site.team.map((member, index) => (
            <li key={index} className="team-member">
              <div className={`team-portrait${member.name ? " team-portrait-named" : ""}`}>
                {member.portrait ? <Image src={member.portrait} alt={member.name ? `Portrait of ${member.name}` : "Team portrait"} fill sizes="(max-width: 760px) 100vw, 33vw" /> : <div className="team-monogram" aria-hidden="true">{member.name ? member.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("") : <UserRound size={72} strokeWidth={1} />}</div>}
                {!member.name && <span>Profile coming soon</span>}
              </div>
              <div className="team-member-copy">
                <h2>{member.name || "Meet the team, soon."}</h2>
                {member.role && <p className="team-role">{member.role}</p>}
                {member.bio && <p className="team-bio">{member.bio}</p>}
              </div>
            </li>
          ))}
        </ul>
        <div className="team-about" data-motion="rise"><p>Curious about how we work together?</p><Link href="/about" className="text-link">Our approach to partnership <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
    </>
  );
}
