import { Layout } from "../../components/Layout";
import { StaffGrid, type StaffMember } from "../../components/StaffGrid";
import { StaffList, type BoardMember } from "../../components/StaffList";
import { VisionSection, type ValueItem, type GoalItem } from "../../components/VisionSection";
import { Timeline, type TimelineEvent } from "../../components/Timeline";
import { JoinOrgSection } from "../../components/JoinOrgSection";
import { useTranslation } from "react-i18next";

// Import hero image
import heroImage from "../../assets/heroimages/hero7.jpeg";

// Import staff mugshots - update these paths to your actual images
import staff1 from "../../assets/staff/staff1.jpg";
import staff2 from "../../assets/staff/staff2.jpg";
import staff3 from "../../assets/staff/staff3.jpg";
import staff4 from "../../assets/staff/staff4.jpg";
import staff5 from "../../assets/staff/staff5.jpg";
import staff6 from "../../assets/staff/staff6.jpg";

// Optional: Import timeline icons
// import icon1950 from "../../assets/timeline/icon1950.png";

export function OrgView() {
  const { t } = useTranslation();

  // Core staff members (max 6)
  const coreStaff: StaffMember[] = [
    {
      name: t("org.staff1.name", "Matti Meikäläinen"),
      title: t("org.staff1.title", "Toiminnanjohtaja"),
      description: t("org.staff1.description", "Matti on johtanut Konviktia vuodesta 2020 ja vastaa päivittäisestä toiminnasta."),
      image: staff1,
    },
    {
      name: t("org.staff2.name", "Maija Virtanen"),
      title: t("org.staff2.title", "Asukaskoordinaattori"),
      description: t("org.staff2.description", "Maija huolehtii asukkaiden hyvinvoinnista ja yhteisön toiminnasta."),
      image: staff2,
    },
    {
      name: t("org.staff3.name", "Pekka Korhonen"),
      title: t("org.staff3.title", "Talousvastaava"),
      description: t("org.staff3.description", "Pekka vastaa yhdistyksen taloudesta ja kirjanpidosta."),
      image: staff3,
    },
    {
      name: t("org.staff4.name", "Anna Laine"),
      title: t("org.staff4.title", "Viestintävastaava"),
      description: t("org.staff4.description", "Anna hoitaa Konviktin viestintää ja sosiaalista mediaa."),
      image: staff4,
    },
    {
      name: t("org.staff5.name", "Juha Nieminen"),
      title: t("org.staff5.title", "Kiinteistövastaava"),
      description: t("org.staff5.description", "Juha huolehtii tilojen kunnossapidosta ja turvallisuudesta."),
      image: staff5,
    },
    {
      name: t("org.staff6.name", "Liisa Mäkinen"),
      title: t("org.staff6.title", "Tapahtumakoordinaattori"),
      description: t("org.staff6.description", "Liisa järjestää yhteisöllisiä tapahtumia ja aktiviteetteja."),
      image: staff6,
    },
  ];

  // Board members
  const boardMembers: BoardMember[] = [
    { name: t("org.board1.name", "Erkki Esimerkki"), role: t("org.board1.role", "Puheenjohtaja") },
    { name: t("org.board2.name", "Tiina Toinen"), role: t("org.board2.role", "Varapuheenjohtaja") },
    { name: t("org.board3.name", "Kalle Kolmas"), role: t("org.board3.role", "Sihteeri") },
    { name: t("org.board4.name", "Sanna Neljäs"), role: t("org.board4.role", "Rahastonhoitaja") },
    { name: t("org.board5.name", "Ville Viides"), role: t("org.board5.role", "Jäsen") },
    { name: t("org.board6.name", "Paula Kuudes"), role: t("org.board6.role", "Jäsen") },
    { name: t("org.board7.name", "Mikko Seitsemäs"), role: t("org.board7.role", "Varajäsen") },
  ];

  // Core values
  const values: ValueItem[] = [
    {
      title: t("org.value1.title", "Yhteisöllisyys"),
      description: t("org.value1.description", "Uskomme vahvaan yhteisöön, jossa jokainen tuntee kuuluvansa joukkoon ja saa tukea tarvittaessa."),
    },
    {
      title: t("org.value2.title", "Vastuullisuus"),
      description: t("org.value2.description", "Kannamme vastuun teoistamme ja ympäristöstämme. Toimimme kestävästi ja eettisesti."),
    },
    {
      title: t("org.value3.title", "Avoimuus"),
      description: t("org.value3.description", "Toimimme läpinäkyvästi ja olemme avoimia uusille ideoille ja ihmisille."),
    },
    {
      title: t("org.value4.title", "Kasvu"),
      description: t("org.value4.description", "Tuemme jokaisen henkilökohtaista kasvua ja tarjoamme mahdollisuuksia kehittyä."),
    },
  ];

  // 10-year goals
  const goals: GoalItem[] = [
    {
      title: t("org.goal1.title", "Laajentaa asukasmäärää"),
      description: t("org.goal1.description", "Tarjota koti 50 opiskelijalle vuoteen 2035 mennessä."),
    },
    {
      title: t("org.goal2.title", "Kestävä kehitys"),
      description: t("org.goal2.description", "Saavuttaa hiilineutraalius toiminnassamme."),
    },
    {
      title: t("org.goal3.title", "Yhteistyöverkosto"),
      description: t("org.goal3.description", "Rakentaa vahva verkosto muiden opiskelijajärjestöjen kanssa."),
    },
    {
      title: t("org.goal4.title", "Taloudellinen vakaus"),
      description: t("org.goal4.description", "Varmistaa pitkäjänteinen ja vakaa talous."),
    },
    {
      title: t("org.goal5.title", "Digitalisaatio"),
      description: t("org.goal5.description", "Modernisoida toimintamme digitaalisilla työkaluilla."),
    },
  ];

  // History timeline
  const timelineEvents: TimelineEvent[] = [
    {
      year: "1917",
      title: t("org.history1.title", "Perustaminen"),
      description: t("org.history1.description", "Konvikti perustettiin vastaamaan teologian opiskelijoiden asumistarpeeseen."),
    },
    {
      year: "1920",
      title: t("org.history2.title", "Ensimmäinen talo"),
      description: t("org.history2.description", "Yhdistys hankki ensimmäisen oman kiinteistönsä Helsingin keskustasta."),
    },
    {
      year: "1960-luku",
      title: t("org.history3.title", "Laajennus"),
      description: t("org.history3.description", "Asukasmäärä kasvoi ja tiloja laajennettiin merkittävästi."),
    },
    {
      year: "1999",
      title: t("org.history4.title", "Remontti"),
      description: t("org.history4.description", "Suuri peruskorjaus modernisoi tilat ja paransi asumisviihtyvyyttä."),
    },
    {
      year: "2013",
      title: t("org.history5.title", "60-vuotisjuhla"),
      description: t("org.history5.description", "Konvikti juhli 60-vuotista taivaltaan suurella juhlalla."),
    },
    {
      year: "2024",
      title: t("org.history6.title", "Uusi aikakausi"),
      description: t("org.history6.description", "Digitalisaatio ja uudet toimintatavat otettiin käyttöön."),
    },
    {
      year: "2026",
      title: t("org.history7.title", "75 vuotta"),
      description: t("org.history7.description", "Konvikti täyttää 75 vuotta ja katsoo luottavaisena tulevaisuuteen."),
    },
  ];

  return (
    <Layout
      showFooter={true}
      heroImage={heroImage}
      heroTitle={t("org.hero.title", "Claustrum Theologicum")}
      heroText={t("org.hero.subtitle", "Teologisen tiedekunnan opiskelijoiden koti vuodesta 1950")}
    >
      {/* Core Staff */}
      <StaffGrid
        title={t("org.staffSection.title", "Henkilökunta")}
        subtitle={t("org.staffSection.subtitle", "Tutustut ydinhenkilöstöömme, joka pitää Konviktin pyörimässä")}
        members={coreStaff}
        backgroundColor="bg-background"
      />

      {/* Board */}
      <StaffList
        title={t("org.boardSection.title", "Hallitus")}
        subtitle={t("org.boardSection.subtitle", "Yhdistyksen hallitus ohjaa toimintaamme")}
        members={boardMembers}
        backgroundColor="bg-backgroundBlue"
      />

      {/* Vision & Goals */}
      <VisionSection
        title={t("org.visionSection.title", "Visio ja arvot")}
        subtitle={t("org.visionSection.subtitle", "Mihin uskomme ja mihin pyrimme")}
        valuesTitle={t("org.visionSection.valuesTitle", "Arvomme")}
        values={values}
        goalsTitle={t("org.visionSection.goalsTitle", "Tavoitteemme 2035")}
        goals={goals}
        backgroundColor="bg-background"
      />

      {/* Join Organization - First CTA */}
      <JoinOrgSection
        subtitle={t("org.join.subtitle", "Tule mukaan")}
        title={t("org.join.title", "Haluatko olla osa Konviktia?")}
        description={t("org.join.description", "Etsimme aktiivisia ihmisiä mukaan toimintaamme. Hallituspaikat, vapaaehtoistyö ja muut mahdollisuudet odottavat sinua.")}
        buttonText={t("org.join.button", "Täytä rekrytointilomake")}
        backgroundColor="bg-backgroundBlue"
        variant="default"
      />

      {/* History Timeline */}
      <Timeline
        title={t("org.historySection.title", "Historiamme")}
        subtitle={t("org.historySection.subtitle", "Konviktin tarina vuosien varrelta")}
        events={timelineEvents}
        backgroundColor="bg-background"
      />

      {/* Join Organization - Final CTA */}
      <JoinOrgSection
        subtitle={t("org.joinFinal.subtitle", "Liity joukkoon")}
        title={t("org.joinFinal.title", "Kirjoita oma lukusi Konviktin tarinaan")}
        description={t("org.joinFinal.description", "Olit sitten opiskelija, alumni tai vain kiinnostunut toiminnastamme – ovet ovat auki.")}
        buttonText={t("org.joinFinal.button", "Ota yhteyttä")}
        backgroundColor="bg-backgroundBlue"
        variant="highlight"
      />
    </Layout>
  );
}