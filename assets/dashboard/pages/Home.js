import React from "react";
import Layout from "../components/Layout";
import MyInvestments from "../components/MyInvestments";
import InvestmentOpportunities from "../components/InvestmentOpportunities";

function Home() {
  return (
    <Layout>
        <MyInvestments />
        <InvestmentOpportunities />
    </Layout>
  );
}

export default Home;
