import React, { useState } from 'react';
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
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface ShareProps {
  title: string;
  url: string;
  tag: string;
  tags: string[];
}

export default function ShareButttons({ title, url, tag, tags }: ShareProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  }
  return (
    <div className={styles.container}>
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

        <RedditShareButton
          className={styles.shareButton}
          url={url}
          title={title}
        >
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
      <Tooltip
        title={!copied ? 'Copy to clipboard' : 'Copied!'}
        placement="right"
      >
        <div>
          <AssignmentIcon
            className={styles.copyUrl}
            onClick={copy}
            fontSize="large"
            color="action"
          />
        </div>
      </Tooltip>
    </div>
  );
}
