import React from "react";
import { Typography, Row, Col, Card } from "antd";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Title } = Typography;

const News = () => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
  });
  if (!cryptoNews) {
    return <div>Fetching data...</div>;
  }

  return (
    <>
      {window.location.pathname === "/news" ? (
        <>
          <Title className="news-title" level={4}>
            Latest Crypto News:
          </Title>
          <Row gutter={[24, 24]}>
            {cryptoNews.map((news) => (
              <Col xs={24} sm={12} lg={8} key={news.url}>
                <Card hoverable className="news-card">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-container">
                      <Title className="news-title" level={4}>
                        {news.title}
                      </Title>
                    </div>
                    <p>{news.date}</p>
                    <p>{news.description}</p>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Row gutter={[24, 24]}>
          {cryptoNews.map((news) => (
            <Col xs={24} sm={12} lg={8} key={news.url}>
              <Card hoverable className="news-card-home">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.title}
                    </Title>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default News;
