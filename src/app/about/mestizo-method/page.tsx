import type { Metadata } from "next";
import Link from "next/link";
import { AboutTabs } from "@/components/layout/about-tabs";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { MestizoDepth } from "@/components/home/mestizo-depth";

export const metadata: Metadata = {
  title: "The Mestizo Method",
  description:
    "The history of the Mestizo Method — New Dragons Rising's synthesis of Esgrima, Kali, and Arnis, created by Grandmaster Rudy Torres.",
};

export default function MestizoMethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <AboutTabs active="/about/mestizo-method" />

      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          A Living Synthesis
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          New Dragons Rising: Journey Through the Mestizo Method
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="my-16">
          <MestizoDepth />
        </div>
      </Reveal>

      <div className="space-y-14 text-lg leading-relaxed text-text-body">
        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              Collaborative Martial Arts Innovation
            </h2>
            <p className="mt-5">
              New Dragons Rising was created by Grand Master Rudy Torres,
              renowned for his invaluable contributions to martial arts.
              The inception of this initiative was driven by the vision
              of GM Torres, alongside friends, family, and fellow martial
              artists. Their collective effort led to the formation of a
              unique method known as the &ldquo;Mestizo Method,&rdquo;
              which seamlessly integrates various martial arts
              disciplines, with a significant emphasis on Esgrima, Kali,
              and Arnis.
            </p>
            <p className="mt-5">
              The Mestizo Method serves as an invitation to martial
              artists and schools inspired by GM Torres&rsquo; son, Rudy
              Torres Jr., a martial artist extraordinaire. Rudy Torres
              Jr., under the tutelage of his father, embraced the
              philosophy of learning from everyone and everything,
              including the intricate techniques of Esgrima, the fluid
              movements of Kali, and the practical applications of Arnis.
              This ethos forms the cornerstone of New Dragons Rising.
            </p>
            <p className="mt-5">
              The driving force behind New Dragons Rising is the
              commitment to foster growth, experience, diversity, and
              knowledge within the martial arts community. The journey
              embarked upon by GM Torres and Rudy Torres Jr. is one of
              continuous learning and unification of different martial
              arts practices — particularly Esgrima, Kali, and Arnis.
              This initiative aims to transcend traditional boundaries
              and create a cohesive environment where martial artists can
              share their expertise and learn from one another.
            </p>
          </section>
        </Reveal>

        <RattanDivider />

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              Origins and Vision
            </h2>
            <p className="mt-5">
              Grand Master Rudy Torres, a prominent figure in martial
              arts, has always been passionate about the art&rsquo;s
              evolution and the collaborative fusion of different styles.
              The creation of New Dragons Rising was born out of a desire
              to bring together diverse martial arts forms, such as
              Esgrima, Kali, and Arnis, under one umbrella, fostering a
              culture of mutual respect and shared knowledge.
            </p>
            <p className="mt-5">
              The Mestizo Method, which lies at the heart of New Dragons
              Rising, embodies the concept of blending various martial
              arts techniques into a unified practice. This method not
              only celebrates the rich heritage of each discipline,
              especially Esgrima, Kali, and Arnis, but also encourages
              practitioners to broaden their horizons and explore new
              techniques.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              The Role of Rudy Torres Jr.
            </h2>
            <p className="mt-5">
              Rudy Torres Jr., the son of GM Torres, played a pivotal
              role in shaping the vision of New Dragons Rising. His
              extraordinary skills and dedication to martial arts were
              instrumental in inspiring others to embrace the Mestizo
              Method. Rudy Jr.&rsquo;s journey in martial arts, guided by
              his father&rsquo;s wisdom, exemplifies the spirit of
              learning and adaptability.
            </p>
            <p className="mt-5">
              Under GM Torres&rsquo; guidance, Rudy Jr. mastered the art
              of learning from everyone and everything, including the
              techniques of Esgrima, Kali, and Arnis — a principle that
              is now embedded in the DNA of New Dragons Rising. His
              ability to integrate diverse techniques and philosophies
              has greatly contributed to the evolution of the Mestizo
              Method.
            </p>
            <p className="mt-5">
              Unfortunately, and a great loss to us all, young master
              Rudy Torres Jr. was taken from us in a devastating
              accident. Though he may be physically gone, his spirit,
              perseverance, inspiration and contribution to life and the
              martial arts will forever live in perpetuity. God bless and
              keep you.
            </p>
            <p className="mt-6">
              <Link
                href="/about/in-memoriam"
                className="border-b border-red-core pb-1 text-white transition-colors hover:text-red-highlight"
              >
                Read In Memoriam: Rudy Torres Jr. →
              </Link>
            </p>
          </section>
        </Reveal>

        <RattanDivider />

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              Invitation to the Martial Arts Community
            </h2>
            <p className="mt-5">
              New Dragons Rising extends a heartfelt invitation to
              martial artists and schools worldwide to join this
              movement of growth and diversity. The initiative encourages
              practitioners to step out of their comfort zones and engage
              in a collaborative exchange of knowledge. It is an
              opportunity to be part of a dynamic community that values
              innovation and continuous learning.
            </p>
            <p className="mt-5">
              By joining New Dragons Rising, martial artists can benefit
              from a wealth of experience and knowledge shared by fellow
              practitioners. This collective effort aims to enhance the
              skills of each participant and create a supportive
              environment where everyone can thrive.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              Honoring the Legacy
            </h2>
            <p className="mt-5">
              The foundation of New Dragons Rising is built on the legacy
              of Grand Master Rudy Torres and his son Rudy Torres Jr.
              Their lifelong dedication to martial arts and their vision
              of a united community serve as the guiding principles of
              this initiative. The journey of GM Torres and Rudy Jr. is a
              testament to the power of collaboration and the endless
              possibilities that arise from embracing diversity.
            </p>
            <p className="mt-5">
              New Dragons Rising is not just a martial arts initiative;
              it is a tribute to the extraordinary contributions of GM
              Torres and Rudy Jr. Their story is an inspiration to all
              martial artists, encouraging them to pursue excellence and
              honor the rich traditions of the art.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">
              The Journey Ahead
            </h2>
            <p className="mt-5">
              As New Dragons Rising continues to grow, it seeks to expand
              its reach and impact within the martial arts community. The
              journey ahead is one of exploration and innovation, with
              the Mestizo Method serving as the guiding light. The
              initiative aims to inspire practitioners to constantly
              evolve and adapt, embracing new techniques and philosophies,
              with a significant focus on Esgrima, Kali, and Arnis.
            </p>
            <p className="mt-5">
              The future of New Dragons Rising is bright, with countless
              opportunities for collaboration and growth. The initiative
              looks forward to welcoming new members and schools into its
              fold, fostering a culture of unity and shared knowledge.
            </p>
          </section>
        </Reveal>

        <RattanDivider />

        <Reveal>
          <section>
            <h2 className="font-display text-2xl text-white">Conclusion</h2>
            <p className="mt-5">
              New Dragons Rising, driven by the vision of Grand Master
              Rudy Torres and the inspiration of Rudy Torres Jr., is a
              testament to the transformative power of collaboration in
              martial arts. The Mestizo Method embodies the spirit of
              learning and adaptability, encouraging practitioners to
              embrace diversity and continuously strive for excellence.
            </p>
            <p className="mt-5">
              The initiative&rsquo;s invitation to martial artists and
              schools is a call to be part of a movement that values
              growth, experience, diversity, and knowledge. By joining
              New Dragons Rising, practitioners can honor the legacy of
              GM Torres and Rudy Jr. while embarking on a journey of
              endless possibilities and shared expertise.
            </p>
            <p className="mt-5">
              Join New Dragons Rising and be part of this extraordinary
              journey towards mastering the art of collaboration and
              embracing the true essence of martial arts.
            </p>
            <Link
              href="/join"
              className="mt-8 inline-block rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
            >
              Join New Dragons Rising
            </Link>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
