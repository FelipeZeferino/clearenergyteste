import React from "react";
import Header from "./components/Header";
import Features from "./components/Features";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";

export default function CleanEnergySimulator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <LeadForm />
      <Features />
      <Footer />
    </div>
  );
}
