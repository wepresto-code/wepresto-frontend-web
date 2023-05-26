"use client";

import React from "react";

import signOut from "@wepresto/firebase/sign-out";

import ValidateUser from "@wepresto/components/ValidateUser";

export default function Borrower() {
  const handleSignOutClick = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ValidateUser type={"lender"} />
      <div>
        <h1>Lender</h1>
        <button onClick={handleSignOutClick}>Sign out</button>
      </div>
    </>
  );
}
