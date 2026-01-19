/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blogipostaus",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Otsikko",
      type: "string",
      validation: (Rule) => Rule.required().error("Otsikko on pakollinen"),
    }),
    defineField({
      name: "slug",
      title: "URL-tunniste",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("URL-tunniste on pakollinen"),
    }),
    defineField({
      name: "author",
      title: "Kirjoittaja",
      type: "string",
      validation: (Rule) => Rule.required().error("Kirjoittaja on pakollinen"),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          { title: "Blogi", value: "blog" },
          { title: "Uutiset", value: "news" },
          { title: "Tiedote", value: "announcement" },
          { title: "Tapahtuma", value: "event" },
          { title: "Asukashaku", value: "asukashaku" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
    }),
    defineField({
      name: "hakuStatus",
      title: "Haun tila",
      description: "Käytetään vain Asukashaku-postauksissa",
      type: "string",
      options: {
        list: [
          { title: "Haku käynnissä", value: "open" },
          { title: "Haku päättynyt", value: "closed" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.category !== "asukashaku",
      initialValue: "open",
    }),
    defineField({
      name: "coverImage",
      title: "Kansikuva",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Lyhyt kuvaus",
      type: "text",
      rows: 3,
      description: "Lyhyt kuvaus joka näkyy listauksessa",
    }),
    defineField({
      name: "content",
      title: "Sisältö",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaali", value: "normal" },
            { title: "Otsikko 2", value: "h2" },
            { title: "Otsikko 3", value: "h3" },
            { title: "Lainaus", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Lihavoitu", value: "strong" },
              { title: "Kursivoitu", value: "em" },
              { title: "Alleviivattu", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Linkki",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "Kuva",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Kuvateksti",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt-teksti",
            },
            {
              name: "size",
              type: "string",
              title: "Koko",
              options: {
                list: [
                  { title: "Pieni", value: "small" },
                  { title: "Keskikokoinen", value: "medium" },
                  { title: "Suuri", value: "large" },
                ],
                layout: "radio",
              },
              initialValue: "large",
            },
          ],
        },
        {
          type: "object",
          name: "gallery",
          title: "Kuvagalleria",
          fields: [
            {
              name: "images",
              type: "array",
              title: "Kuvat",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: "caption",
                      type: "string",
                      title: "Kuvateksti",
                    },
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt-teksti",
                    },
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.min(2).error("Galleriassa täytyy olla vähintään 2 kuvaa"),
            },
            {
              name: "layout",
              type: "string",
              title: "Asettelu",
              options: {
                list: [
                  { title: "Ruudukko (2 saraketta)", value: "grid-2" },
                  { title: "Ruudukko (3 saraketta)", value: "grid-3" },
                  { title: "Karuselli", value: "carousel" },
                ],
                layout: "radio",
              },
              initialValue: "grid-2",
            },
            {
              name: "caption",
              type: "string",
              title: "Gallerian otsikko",
            },
          ],
          preview: {
            select: {
              images: "images",
              layout: "layout",
            },
            prepare({ images, layout }) {
              const layoutLabels: Record<string, string> = {
                "grid-2": "2 saraketta",
                "grid-3": "3 saraketta",
                carousel: "Karuselli",
              };
              return {
                title: `Galleria (${images?.length || 0} kuvaa)`,
                subtitle: layoutLabels[layout] || layout,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tagit",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Julkaisupäivä",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
      category: "category",
      hakuStatus: "hakuStatus",
    },
    prepare(selection) {
      const { title, author, media, category, hakuStatus } = selection;
      const categoryLabels: Record<string, string> = {
        blog: "Blogi",
        news: "Uutiset",
        announcement: "Tiedote",
        event: "Tapahtuma",
        asukashaku: "Asukashaku",
      };
      const statusLabel =
        category === "asukashaku"
          ? ` (${hakuStatus === "open" ? "Käynnissä" : "Päättynyt"})`
          : "";
      return {
        title,
        subtitle: `${
          categoryLabels[category] || category
        }${statusLabel} — ${author}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Julkaisupäivä, uusin ensin",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
