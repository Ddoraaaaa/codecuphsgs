"use client";

import SubsectionBodyContainer from "../components/subsectionBodyContainer";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  
  return (
      <SubsectionBodyContainer>{children}</SubsectionBodyContainer>
  )
}
