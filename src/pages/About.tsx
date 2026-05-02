import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> 홈으로
          </Link>
        </Button>
        <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
          ABOUT US
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
          회사 소개
        </h1>
        <p className="mt-8 text-muted-foreground">
          상세 회사 소개 페이지는 준비 중입니다.
        </p>
      </div>
    </div>
  );
};

export default About;
