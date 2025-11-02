
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const AriesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 75V50a25 25 0 0150 0v25M25 50a25 25 0 0050 0" /></IconWrapper>
);
export const TaurusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M50 75a25 25 0 100-50 25 25 0 100 50zM35 25a25 25 0 0130 0" /></IconWrapper>
);
export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 25h50M25 75h50M40 25v50M60 25v50" /></IconWrapper>
);
export const CancerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 40a25 25 0 0050 0M25 60a25 25 0 0150 0" /></IconWrapper>
);
export const LeoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 75a25 25 0 100-50v50h25a25 25 0 000-50" /></IconWrapper>
);
export const VirgoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 25v50M45 25v50M65 25v50M65 75l15-25-15-25" /></IconWrapper>
);
export const LibraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M20 75h60M25 50h50a25 25 0 00-50 0" /></IconWrapper>
);
export const ScorpioIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 25v50M45 25v50M65 25v25l15 25-15-25" /></IconWrapper>
);
export const SagittariusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 75l50-50M50 75h25V50" /></IconWrapper>
);
export const CapricornIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 50v25l25-25V25l25 25-25 25" /></IconWrapper>
);
export const AquariusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 40l12.5-10L50 40l12.5-10L75 40M25 60l12.5-10L50 60l12.5-10L75 60" /></IconWrapper>
);
export const PiscesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M25 25a25 25 0 000 50M75 25a25 25 0 010 50M25 50h50" /></IconWrapper>
);
