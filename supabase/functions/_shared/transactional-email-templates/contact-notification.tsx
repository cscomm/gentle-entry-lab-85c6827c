import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'SiLiCA'

interface ContactNotificationProps {
  name?: string
  phone?: string
  email?: string
  company?: string
  message?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={rowText}>
      <span style={rowLabel}>{label}</span> {value}
    </Text>
  ) : null

const ContactNotificationEmail = ({ name, phone, email, company, message }: ContactNotificationProps) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>새 홈페이지 문의가 도착했습니다</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>새 홈페이지 문의</Heading>
        <Section style={card}>
          <Row label="이름" value={name} />
          <Row label="연락처" value={phone} />
          <Row label="이메일" value={email} />
          <Row label="회사명" value={company} />
        </Section>
        <Heading style={h2}>문의 내용</Heading>
        <Section style={messageBox}>
          <Text style={messageText}>{message ?? '(내용 없음)'}</Text>
        </Section>
        <Text style={footer}>— {SITE_NAME} 홈페이지 문의 폼</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `[홈페이지 문의] ${data?.name ?? '고객'}님 문의 도착`,
  displayName: '문의 접수 알림 (관리자용)',
  previewData: {
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    company: 'ABC 주식회사',
    message: '용융실리카 분말 견적 문의드립니다.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px' }
const h2 = { fontSize: '14px', fontWeight: 'bold', color: '#0f172a', margin: '20px 0 8px' }
const card = { backgroundColor: '#f8fafc', padding: '16px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }
const rowText = { fontSize: '14px', color: '#0f172a', lineHeight: '1.7', margin: '0 0 4px' }
const rowLabel = { display: 'inline-block', minWidth: '64px', color: '#64748b', fontSize: '12px', fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginRight: '8px' }
const messageBox = { backgroundColor: '#f1f5f9', borderLeft: '3px solid #0ea5e9', padding: '14px 16px', borderRadius: '6px' }
const messageText = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '28px 0 0' }
