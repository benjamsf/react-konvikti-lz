import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../Button";

interface InfoModalProps {
  triggerClassName: string;
}

export function PrivacyPolicyModal({ triggerClassName }: InfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className={triggerClassName} onClick={openModal}>
          Tietosuoja
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-background rounded-md max-w-md mx-auto p-8">
            <Dialog.Title className="text-lg text-white font-bold mb-4">
              Tietosuojaseloste
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-white">
              Keräämme tietoja käyttäjistä, jotta voimme tarjota parempaa
              palvelua ja varmistaa palvelun turvallisuuden valvonnalla.
              <br />
              <br />
              Emme luovuta tietoja kolmansille osapuolille mihinkään
              kaupallisiin tarkoituksiin. Emme käytä kolmannen osapuolen
              tarjoamia jäljittäviä evästepalveluita tiedon keräämiseen.
              <br />
              <br />
              <strong>Tietoja, mitä keräämme:</strong>
              <li>IP-osoitteesi.</li>
              <li>Maa, josta liikennöit.</li>
              <li>User agent, eli käyttämäsi selain ja käyttöjärjestelmä.</li>
              <li>Palveluun syöttämäsi tiedot.</li>
              <br />
              <strong>Mitä tietoja emme kerää:</strong>
              <li>
                Kolmannen osapuolen jäljittäviin eväisteisiin (3rd party
                tracking cookies) perustuvaa tietoa.{" "}
              </li>
              <li>
                Mitään henkilötietoja, mukaanlukien sähköpostiosoitteita,
                puhelinnumeroja.
              </li>
              <br />
              Tietoja käsittelee Ylioppilaskoti Konviktin kannatusyhdistys r.y. ja sen valtuuttamat henkilöt Suomessa.
            </Dialog.Description>
            <div className="flex justify-end">
              <Button onClick={closeModal}>OK</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
