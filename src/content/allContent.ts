import childData from "@/content/child/6-12.json";
import under1Data from "@/content/child/under-1.json";
import oneToThreeData from "@/content/child/1-3.json";
import threeToSixData from "@/content/child/3-6.json";
import emotionsData from "@/content/child/emotions.json";
import regulationData from "@/content/child/emotional-regulation.json";
import booksData from "@/content/child/books.json";
import screenData from "@/content/child/screen.json";

export type SearchItem = {
  title: string;
  preview: string;
  link: string;
  icon: string;
  category: string;
};

export const allContent: SearchItem[] = [
  // کودک
  ...(under1Data.topics || []).map((t: any) => ({
    title: t.title,
    preview: t.preview || "",
    link: "/child/under-1",
    icon: t.icon || "🍼",
    category: "کودک",
  })),
  ...(oneToThreeData.topics || []).map((t: any) => ({
    title: t.title,
    preview: t.preview || "",
    link: "/child/1-3",
    icon: t.icon || "👶",
    category: "کودک",
  })),
  ...(threeToSixData.topics || []).map((t: any) => ({
    title: t.title,
    preview: t.preview || "",
    link: "/child/3-6",
    icon: t.icon || "🧒",
    category: "کودک",
  })),
  ...(childData.cards || []).map((c: any) => ({
    title: c.title,
    preview: c.subtitle || "",
    link: "/child/6-12",
    icon: c.icon || "👦",
    category: "کودک",
  })),
  ...(emotionsData.cards || []).map((c: any) => ({
    title: c.title,
    preview: c.subtitle || "",
    link: "/child/emotions",
    icon: c.icon || "💜",
    category: "کودک",
  })),
  ...(regulationData.cards || []).map((c: any) => ({
    title: c.title,
    preview: c.subtitle || "",
    link: "/child/emotional-regulation",
    icon: c.icon || "🧘",
    category: "کودک",
  })),
  ...(booksData.cards || []).map((c: any) => ({
    title: c.title,
    preview: c.subtitle || "",
    link: "/child/books",
    icon: c.icon || "📚",
    category: "کودک",
  })),
  ...(screenData.cards || []).map((c: any) => ({
    title: c.title,
    preview: c.subtitle || "",
    link: "/child/screen",
    icon: c.icon || "📱",
    category: "کودک",
  })),

  // بخش‌های کودک (دستی)
  {
    title: "بارداری و زایمان",
    preview: "از بارداری تا بعد از زایمان",
    link: "/child/pregnancy",
    icon: "🤰",
    category: "کودک",
  },
  {
    title: "زایمان",
    preview: "آماده برای روز موعود",
    link: "/child/pregnancy/birth",
    icon: "🏥",
    category: "کودک",
  },
  {
    title: "سه ماهه اول",
    preview: "هفته ۱ تا ۱۳",
    link: "/child/pregnancy/first-trimester",
    icon: "🌸",
    category: "کودک",
  },
  {
    title: "سه ماهه دوم",
    preview: "هفته ۱۴ تا ۲۷",
    link: "/child/pregnancy/second-trimester",
    icon: "🌺",
    category: "کودک",
  },
  {
    title: "سه ماهه سوم",
    preview: "هفته ۲۸ تا ۴۰",
    link: "/child/pregnancy/third-trimester",
    icon: "🌼",
    category: "کودک",
  },
  {
    title: "علائم خطر بارداری",
    preview: "این علائم رو جدی بگیر",
    link: "/child/pregnancy/danger-signs",
    icon: "⚠️",
    category: "کودک",
  },
  {
    title: "آماده‌سازی زایمان",
    preview: "برای روز موعود آماده شو",
    link: "/child/pregnancy/preparation",
    icon: "👶",
    category: "کودک",
  },
  {
    title: "بعد از زایمان",
    preview: "مراقبت از خودت، تو هم مهمی",
    link: "/child/pregnancy/after-birth",
    icon: "💜",
    category: "کودک",
  },
];