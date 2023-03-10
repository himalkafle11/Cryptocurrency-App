import React, { useEffect, useState } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <>
          <div classname="search-crypto">
            <Input
              placeholder="Search Cryptocurrencies"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h1 style={{ paddingTop: "24px" }}>Top 100 cryptocurrencies:</h1>
        </>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.name}
          >
            <a href={currency.coinrankingUrl} target="_blank" rel="noreferrer">
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt="cryptoImages"
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price:{millify(currency.price)}</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}%</p>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
