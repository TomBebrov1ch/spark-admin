import React from "react";
import styles from "./styles.module.scss";
import SparkLogo from "@assets/spark_product_logo.svg";

import { Breadcrumbs } from "@shared/ui/Breadcrumbs";
import { faFile, faGlobe, faHome } from "@fortawesome/free-solid-svg-icons";

interface HeaderEditorProps {
  websiteName: string;
  websiteURL: string;
  pageType: string;
  pageURL: string;
}

export const HeaderEditor: React.FC<HeaderEditorProps> = ({
  websiteName,
  websiteURL,
  pageType,
  pageURL,
}) => {
  const breadcrumbData = [
    { label: "Веб-сайты", path: "/websites", icon: faHome },
    { label: websiteName, path: websiteURL, icon: faGlobe },
    { label: pageType, path: pageURL, icon: faFile },
  ];

  return (
    <header className={styles.header_edit}>
      <div className={styles.header_edit__content}>
        <nav className="flex items-center gap-8">
          <div className={styles.header_edit__content__logo}>
            <SparkLogo />
          </div>
          <Breadcrumbs crumbs={breadcrumbData} />
        </nav>
      </div>
    </header>
  );
};
