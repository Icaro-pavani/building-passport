import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

export default function QRCodePage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const imageSource = url.split("?src=")[1];
    setImage(imageSource);
  }, []);
  return (
    <QRCodeContainer>
      <Header />
      <img src={image} alt="qrcode" />
    </QRCodeContainer>
  );
}

const QRCodeContainer = styled.div`
  img {
    margin-top: 100px;
  }
`;
