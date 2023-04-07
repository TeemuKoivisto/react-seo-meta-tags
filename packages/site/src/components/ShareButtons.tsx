import * as React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon
} from 'react-share'
import styled from 'styled-components'

interface IProps {
  className?: string
  url: string
  title: string
}

function ShareButtonsEl(props: IProps) {
  const { className, url, title } = props
  return (
    <Container className={className}>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={40} />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} windowWidth={750} windowHeight={600}>
        <LinkedinIcon size={40} />
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title} windowWidth={660} windowHeight={460}>
        <RedditIcon size={40} />
      </RedditShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={40} />
      </WhatsappShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={40} />
      </TelegramShareButton>

      <EmailShareButton url={url} subject={title} body={url}>
        <EmailIcon size={40} />
      </EmailShareButton>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  & > div {
    cursor: pointer;
    margin-right: 5px;
  }
`

export const ShareButtons = styled(ShareButtonsEl)``
