import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'SiLiCA'

interface ContactConfirmationProps {
  name?: string
  message?: string
}

const ContactConfirmationEmail = ({ name, message }: ContactConfirmationProps) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>{SITE_NAME}에 문의해 주셔서 감사합니다</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `${name}님, 문의 감사합니다` : '문의해 주셔서 감사합니다'}
        </Heading>
        <Text style={text}>
          {SITE_NAME}에 문의를 보내주셔서 감사합니다. 담당자가 확인 후 빠른 시일 내에 회신드리겠습니다.
        </Text>
        {message ? (
          <Section style={quoteBox}>
            <Text style={quoteLabel}>접수된 문의 내용</Text>
            <Text style={quoteText}>{message}</Text>
          </Section>
        ) : null}
        <Text style={text}>
          추가 문의 사항이 있으시면 본 메일에 회신해 주시거나 31-356-5682로 연락 주십시오.
        </Text>
        <Text style={footer}>— {SITE_NAME} 드림</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: `[${SITE_NAME}] 문의가 정상 접수되었습니다`,
  displayName: '문의 접수 확인 (고객용)',
  previewData: { name: '홍길동', message: '용융실리카 분말 견적 문의드립니다.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const quoteBox = { backgroundColor: '#f1f5f9', borderLeft: '3px solid #0ea5e9', padding: '14px 16px', margin: '18px 0', borderRadius: '6px' }
const quoteLabel = { fontSize: '11px', color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 6px' }
const quoteText = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '28px 0 0' }
