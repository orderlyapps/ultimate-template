import { IonLabel } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
import { formatPublisherName } from "@format/formatPublisherName";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useGeneratePublisherOtp } from "./components/use-generate-publisher-otp/useGeneratePublisherOtp";
import { usePublisherPhoneLookup } from "./components/use-publisher-phone/usePublisherPhone";
import { OtpDisplayModal } from "./components/otp-display-modal/OtpDisplayModal";

/**
 * Lists every publisher that already has an `auth_id` and gives the admin
 * a button to mint a fresh sign-in OTP. The OTP is displayed via
 * {@link OtpDisplayModal}, with a Send-via-SMS shortcut prefilled from
 * the local rxdb publisher record.
 */
export const AuthUserList: React.FC = () => {
  const { generate } = useGeneratePublisherOtp();
  const phoneLookupFor = usePublisherPhoneLookup();

  const [otp, setOtp] = useState<string | null>(null);
  const [smsPhone, setSmsPhone] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );
  const eligible = publishers?.filter((p) => p.auth_id) ?? [];

  const handleGenerate = async (publisherId: string) => {
    const code = await generate({ publisherId, asAdmin: true });
    if (!code) return;
    setOtp(code);
    setSmsPhone(phoneLookupFor(publisherId));
    setModalOpen(true);
  };

  if (!eligible.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers with auth users yet.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      <List>
        {eligible.map((p) => (
          <Item key={p.id}>
            <IonLabel>
              <Text>{formatPublisherName(p)}</Text>
            </IonLabel>
            <Button
              slot="end"
              size="small"
              onClick={() => handleGenerate(p.id)}
            >
              Generate OTP
            </Button>
          </Item>
        ))}
      </List>
      <OtpDisplayModal
        isOpen={modalOpen}
        otp={otp}
        smsPhone={smsPhone}
        onDismiss={() => setModalOpen(false)}
      />
    </>
  );
};
