import { Layout } from "../../components/Layout";
import { StaffGrid } from "../../components/StaffGrid";
import { StaffList } from "../../components/StaffList";
import {
  VisionSection,
  type ValueItem,
  type GoalItem,
} from "../../components/VisionSection";
import { Timeline, type TimelineEvent } from "../../components/Timeline";
import { JoinOrgSection } from "../../components/JoinOrgSection";
import { CollapsibleRulesCard } from "../../components/CollapsibleRulesCard";
import {
  useStaffMembers,
  useBoardMembers,
  useOrganizationRules,
  type SupportedLanguage,
} from "../../hook/useOrgData";
import { useTranslation } from "react-i18next";

// Import hero image
import heroImage from "../../assets/heroimages/hero7.jpeg";

export function OrgView() {
  const { t, i18n } = useTranslation();

  // Get current language for Sanity queries
  const currentLanguage = (
    i18n.language?.startsWith("en") ? "en" : "fi"
  ) as SupportedLanguage;

  // Fetch staff and board from Sanity with current language
  const { data: staffMembers, isLoading: isLoadingStaff } =
    useStaffMembers(currentLanguage);
  const { data: boardMembers, isLoading: isLoadingBoard } =
    useBoardMembers(currentLanguage);
  const { data: rules, isLoading: isLoadingRules } =
    useOrganizationRules(currentLanguage);

  // Core values
  const values: ValueItem[] = [
    {
      title: t("org.value1.title", "Yhteisöllisyys"),
      description: t(
        "org.value1.description",
        "Uskomme vahvaan yhteisöön, jossa jokainen tuntee kuuluvansa joukkoon ja saa tukea tarvittaessa.",
      ),
    },
    {
      title: t("org.value2.title", "Vastuullisuus"),
      description: t(
        "org.value2.description",
        "Kannamme vastuun teoistamme ja ympäristöstämme. Toimimme kestävästi ja eettisesti.",
      ),
    },
    {
      title: t("org.value3.title", "Avoimuus"),
      description: t(
        "org.value3.description",
        "Toimimme läpinäkyvästi ja olemme avoimia uusille ideoille ja ihmisille.",
      ),
    },
    {
      title: t("org.value4.title", "Kasvu"),
      description: t(
        "org.value4.description",
        "Tuemme jokaisen henkilökohtaista kasvua ja tarjoamme mahdollisuuksia kehittyä.",
      ),
    },
  ];

  // 10-year goals
  const goals: GoalItem[] = [
    {
      title: t("org.goal1.title", "Laajentaa asukasmäärää"),
      description: t(
        "org.goal1.description",
        "Tarjota koti 50 opiskelijalle vuoteen 2035 mennessä.",
      ),
    },
    {
      title: t("org.goal2.title", "Kestävä kehitys"),
      description: t(
        "org.goal2.description",
        "Saavuttaa hiilineutraalius toiminnassamme.",
      ),
    },
    {
      title: t("org.goal3.title", "Yhteistyöverkosto"),
      description: t(
        "org.goal3.description",
        "Rakentaa vahva verkosto muiden opiskelijajärjestöjen kanssa.",
      ),
    },
    {
      title: t("org.goal4.title", "Taloudellinen vakaus"),
      description: t(
        "org.goal4.description",
        "Varmistaa pitkäjänteinen ja vakaa talous.",
      ),
    },
    {
      title: t("org.goal5.title", "Digitalisaatio"),
      description: t(
        "org.goal5.description",
        "Modernisoida toimintamme digitaalisilla työkaluilla.",
      ),
    },
  ];

  // History timeline
  const timelineEvents: TimelineEvent[] = [
    {
      year: "1917",
      title: t("org.history1.title", "Perustaminen"),
      description: t(
        "org.history1.description",
        "Ylioppilaskoti Konviktin kannatusyhdistys ry perustettiin vuonna 1917.",
      ),
    },
    {
      year: "1920",
      title: t("org.history2.title", "Ensimmäinen Konvikti"),
      description: t(
        "org.history2.description",
        "Vuonna 1920 perustettiin ylioppilaskoti, konvikti.",
      ),
    },
    {
      year: "1930-l.",
      title: t("org.history3.title", "Muutto Meritullinkadulle"),
      description: t(
        "org.history3.description",
        "Nykyiseen Isoon-Konviktiin koti siirtyi 30-luvulla.",
      ),
    },
    {
      year: "1960-l.",
      title: t("org.history4.title", "Pikku-Konvikti"),
      description: t(
        "org.history4.description",
        "Emil ja Mimmi Juurinen testamenttilahjoitti kaksi huoneistoa.",
      ),
    },
    {
      year: "1999",
      title: t("org.history5.title", "Jukola"),
      description: t(
        "org.history5.description",
        "Meritullinkatu 22:n rapussa sijainnut Raittiuskoti siirtyi Konviktin käyttöön.",
      ),
    },
    {
      year: "2024",
      title: t("org.history6.title", "Uudelleenjärjestely"),
      description: t(
        "org.history6.description",
        "Kasvaneista kustannuksista johtuen yhdistys joutui luopumaan Jukolasta ja Mirkkulasta.",
      ),
    },
    {
      year: "2026",
      title: t("org.history7.title", "Uusi aika"),
      description: t(
        "org.history7.description",
        "109-vuotias Konvikti tähyää tulevaisuuteen.",
      ),
    },
  ];

  return (
    <Layout
      showFooter={true}
      heroImage={heroImage}
      heroTitle={t(
        "org.hero.title",
        "Claustrum Theologicum - Ylioppilaskoti Konviktin kannatusyhdistys r.y.",
      )}
      heroText={t(
        "org.hero.subtitle",
        "Teologian opiskelijoiden koti vuodesta 1917",
      )}
    >
      {/* Core Staff - from Sanity */}
      <StaffGrid
        title={t("org.staffSection.title", "Henkilökunta")}
        subtitle={t(
          "org.staffSection.subtitle",
          "Tutustu henkilöstöömme, joka pitää Konviktin toiminnassa",
        )}
        members={staffMembers || []}
        backgroundColor="bg-background"
        isLoading={isLoadingStaff}
      />

      {/* Board - from Sanity */}
      <StaffList
        title={t("org.boardSection.title", "Johtokunta")}
        subtitle={t(
          "org.boardSection.subtitle",
          "Yhdistyksen johtokunta ohjaa toimintaamme",
        )}
        members={boardMembers || []}
        backgroundColor="bg-backgroundBlue"
        isLoading={isLoadingBoard}
      />

      {/* Vision & Goals */}
      <VisionSection
        title={t("org.visionSection.title", "Visio ja arvot")}
        subtitle={t(
          "org.visionSection.subtitle",
          "Mihin uskomme ja mihin pyrimme",
        )}
        valuesTitle={t("org.visionSection.valuesTitle", "Arvomme")}
        values={values}
        goalsTitle={t("org.visionSection.goalsTitle", "Tavoitteemme 2036")}
        goals={goals}
        backgroundColor="bg-background"
      />

      {/* Join Organization - First CTA */}
      <JoinOrgSection
        subtitle={t("org.join.subtitle", "Tule mukaan")}
        title={t("org.join.title", "Haluatko olla osa Konviktin missiota?")}
        description={t(
          "org.join.description",
          "Etsimme tehtävästämme kiinnostuneita ihmisiä mukaan toimintaamme. Hallituspaikat, vapaaehtoistyö ja muut mahdollisuudet odottavat sinua.",
        )}
        buttonText={t("org.join.button", "Täytä rekrytointilomake")}
        backgroundColor="bg-backgroundBlue"
        variant="default"
      />

      {/* History Timeline */}
      <Timeline
        title={t("org.historySection.title", "Historiamme")}
        subtitle={t(
          "org.historySection.subtitle",
          "Konviktin tarina vuosien varrelta",
        )}
        events={timelineEvents}
        backgroundColor="bg-background"
      />

      {/* Organization Rules - Collapsible */}
      <section className="py-16 px-4 md:px-8 bg-backgroundBlue">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-white-200 mb-4">
              {t("org.rulesSection.title", "Viralliset asiakirjat")}
            </h2>
            <p className="text-white-500 text-lg max-w-2xl mx-auto">
              {t(
                "org.rulesSection.subtitle",
                "Yhdistyksen säännöt ja muut viralliset dokumentit",
              )}
            </p>
          </div>
          <CollapsibleRulesCard
            title={rules?.title || t("org.rules.title", "Yhdistyksen säännöt")}
            content={rules?.content}
            lastUpdated={rules?.lastUpdated}
            isLoading={isLoadingRules}
          />
        </div>
      </section>

      {/* Join Organization - Final CTA */}
      <JoinOrgSection
        subtitle={t("org.joinFinal.subtitle", "Liity joukkoon")}
        title={t(
          "org.joinFinal.title",
          "Kirjoita oma lukusi Konviktin tarinaan",
        )}
        description={t(
          "org.joinFinal.description",
          "Yhdistyksen tukijäsenenä voit tukea Konviktin arvojen ja tavoitteiden toteutumista pienellä vuosimaksulla ja haluamallasi tavalla. Olit sitten Konviktin alumni tai vain kiinnostunut toiminnastamme – ovet ovat auki.",
        )}
        buttonText={t("org.joinFinal.button", "Ota yhteyttä")}
        backgroundColor="bg-backgroundBlue"
        variant="highlight"
      />
    </Layout>
  );
}
