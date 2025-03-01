/* @license Enterprise */
import { TextInputV2 } from '@/ui/input/components/TextInputV2';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { Controller, useFormContext } from 'react-hook-form';
import { H2Title, Section } from 'twenty-ui';
import { SettingsCustomDomainRecords } from '~/pages/settings/workspace/SettingsCustomDomainRecords';
import { SettingsCustomDomainRecordsStatus } from '~/pages/settings/workspace/SettingsCustomDomainRecordsStatus';
import { customDomainRecordsState } from '~/pages/settings/workspace/states/customDomainRecordsState';
import { useRecoilValue } from 'recoil';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';

const StyledDomainFormWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledRecordsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};

  & > :not(:first-of-type) {
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`;

export const SettingsCustomDomain = () => {
  const { customDomainRecords, loading } = useRecoilValue(
    customDomainRecordsState,
  );

  const currentWorkspace = useRecoilValue(currentWorkspaceState);

  const { t } = useLingui();

  const { control } = useFormContext<{
    customDomain: string;
  }>();

  return (
    <Section>
      <H2Title
        title={t`Custom Domain`}
        description={t`Set the name of your custom domain and configure your DNS records.`}
      />
      <StyledDomainFormWrapper>
        <Controller
          name="customDomain"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputV2
              value={value}
              type="text"
              onChange={onChange}
              placeholder="crm.yourdomain.com"
              error={error?.message}
              loading={!!loading}
              fullWidth
            />
          )}
        />
      </StyledDomainFormWrapper>
      {currentWorkspace?.customDomain && (
        <StyledRecordsWrapper>
          <SettingsCustomDomainRecordsStatus />
          {customDomainRecords && (
            <SettingsCustomDomainRecords
              records={customDomainRecords.records}
            />
          )}
        </StyledRecordsWrapper>
      )}
    </Section>
  );
};
