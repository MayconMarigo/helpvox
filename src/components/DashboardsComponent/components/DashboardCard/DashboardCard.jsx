import React from "react";
import { Card, CardContainer, Container } from "./DashboardCard..styles";
import { useUser } from "contexts/User/User";

export default function DashboardCard({ title, value }) {
  const { user } = useUser();

  return (
    <Card colorScheme={user?.colorScheme}>
      <span>{title || "calculando..."}</span>
      <h3>{value.toString() || "calculando..."}</h3>
    </Card>
  );
}
