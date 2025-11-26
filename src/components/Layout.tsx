import NavBar from "./NavBar";
import Footer from "./Footer";
import AppDownloadModalWrapper from "./AppDownloadModalWrapper";
import WelcomeSplash from "./WelcomeSplash";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <WelcomeSplash />
      <NavBar />
      {children}
      <Footer />
      <AppDownloadModalWrapper />
    </>
  );
}
