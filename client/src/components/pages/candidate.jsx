import ReactLoading from 'react-loading';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import Service from '../service/service';

export default function Candidate(props) {
  const candidate = props.candidate;

  //   console.log(candidate);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <div className="candidate">
        <button onClick={onOpen}>
          <div className="candidateName">{candidate.userProfile.fio}</div>
          <div className="candidateIIN">{candidate.iin}</div>
        </button>
        {/* <button
          className="deleteBtn"
          onClick={() => Service("deleteUser", candidate.iin)}
        >
          ❌
        </button> */}
      </div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{candidate.userProfile.fio}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="candidateBody">
              <div className="candidateName">{candidate.userProfile.fio}</div>
              <div className="candidateIIN">{candidate.iin}</div>
              <div className="candidatePhone">
                {candidate.userProfile.mobilePhone}
              </div>
              <div className="candidateEmail">
                {candidate.userProfile.email}
              </div>
              <div className="candidateCity">
                {candidate.permanentRegion}, {candidate.permanentCity},{' '}
                {candidate.permanentStreet},{candidate.permanentHouse},
                {candidate.permanentApartment}
              </div>
              <div className="candidateCitizenship">
                {candidate.citizenship}
              </div>
              <div className="candidateBtns">
                <Button
                  bg="orange"
                  onClick={() => Service('HR', candidate.iin)}
                >
                  Документы для HR
                </Button>
                <Button
                  bg="#4169e1"
                  onClick={() => Service('SB', candidate.iin)}
                >
                  Документы для СБ
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
