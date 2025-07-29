import React from "react";
import { Card, CardContainer, Container } from "./DashboardCard..styles";

export default function DashboardCard({ title, value }) {
  return (
    <Card>
      <span>{title || "calculando..."}</span>
      <h3>{value || "calculando..."}</h3>
    </Card>
  );
}
