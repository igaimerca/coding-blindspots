import React from 'react';
import styles from './styles.css';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

interface ShareProps {
  title: string;
  url: string;
  tag: string;
  tags: string[];
}

export default function ShareButttons({ title, url, tag, tags }: ShareProps) {
  return (
    <div>
      <FacebookShareButton className={styles.shareButton} url={url}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        className={styles.shareButton}
        url={url}
        title={title}
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton className={styles.shareButton} url={url}>
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>

      <RedditShareButton className={styles.shareButton} url={url} title={title}>
        <RedditIcon size={30} round={true} />
      </RedditShareButton>

      <WhatsappShareButton
        className={styles.shareButton}
        url={url}
        title={title}
      >
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>
    </div>
  );
}
