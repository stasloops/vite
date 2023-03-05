import { Card, Descriptions, Image, List, Skeleton, Space } from "antd";
import React, { createElement, FC, useState } from "react";
import { lowerCase } from "lodash";
import { timeDifference } from "../helpers";
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Share from "./Share";
import { IImageGeneratedItem } from "../interface/ImageGeneration";
import { size } from "../ui/AdaptiveSize";
import { useTranslation } from "react-i18next";

interface Props {
  item: IImageGeneratedItem | null;
}

const TopContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ListItem = styled(List.Item)`
  @media (max-width: ${size.tablet}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const IconText = ({
  icon,
  text,
  color,
}: {
  icon: FC;
  text: string;
  color?: string;
}) => (
  <Space style={{ color: color }}>
    {createElement(icon)}
    {text}
  </Space>
);

const ImageGeneratedItem: FC<Props> = ({ item }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { t } = useTranslation();

  return (
    <Card
      style={{
        marginBottom: "24px",
      }}
    >
      {item ? (
        <ListItem
          style={{ padding: 0 }}
          key={item.id}
          extra={
            <ImageContainer>
              {item?.imageUrl ? (
                <Image
                  width={272}
                  height={(272 * item?.params?.height) / item?.params?.width}
                  alt={item?.params?.prompt}
                  src={item?.imageUrl}
                />
              ) : (
                <Skeleton.Image
                  style={{
                    width: 272 + "px",
                    height:
                      (272 * item?.params?.height) / item?.params?.width + "px",
                  }}
                />
              )}
            </ImageContainer>
          }
          actions={[
            item?.imageUrl ? (
              <a href={item?.imageUrl} download>
                <IconText icon={DownloadOutlined} text="Download" />
              </a>
            ) : undefined,
            item?.imageUrl && item?.generatedAt ? (
              <IconText
                icon={ClockCircleOutlined}
                text={
                  "Generated " + timeDifference(currentTime, item?.generatedAt)
                }
              />
            ) : undefined,
            item?.failedAt ? (
              <IconText
                icon={CloseCircleOutlined}
                text={"Failed " + timeDifference(currentTime, item?.failedAt)}
                color="#f5222d"
              />
            ) : undefined,
          ].filter(Boolean)}
        >
          <TopContainer style={{ display: "flex" }}>
            <List.Item.Meta
              title={<h2>{item?.params?.prompt}</h2>}
              description={
                item?.params?.negative_prompt
                  ? "Negative words: " + item?.params?.negative_prompt
                  : undefined
              }
            />
            <Share image={item.imageUrl} />
          </TopContainer>
          <Descriptions>
            <Descriptions.Item label={t("text2image_size")}>
              {item?.params?.width + "×" + item?.params?.height}
            </Descriptions.Item>
            <Descriptions.Item label={t("text2image_sampler")}>
              <div style={{ textAlign: "center" }}>
                {lowerCase(item?.params?.sampler)}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label={t("text2image_model")}>
              {lowerCase(item?.params?.pipeline_name)}
            </Descriptions.Item>
            <Descriptions.Item label={t("text2image_steps")}>
              {item?.params?.steps}
            </Descriptions.Item>
            <Descriptions.Item label={t("text2image_scale")}>
              {item?.params?.scale}
            </Descriptions.Item>
            <Descriptions.Item label={t("text2image_seed")}>
              {item?.params?.seed}
            </Descriptions.Item>
          </Descriptions>
        </ListItem>
      ) : null}
    </Card>
  );
};

export default ImageGeneratedItem;
