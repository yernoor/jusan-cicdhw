import Footer from '../pageElements/footer';
import Header from '../pageElements/header';
import picture from '../logos/profilePicture.svg';
import formBtn from '../logos/formBtn.svg';
import docBtn from '../logos/docBtn.svg';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import Service from '../service/service';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  ChakraProvider,
} from '@chakra-ui/react';
import { Formik } from 'formik';

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState('');
  const [allFieldsCorrect, setAllFieldsCorrect] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getProfileInfo = useCallback(async () => {
    const profile = await Service('getProfile');
    if (profile) {
      setProfileInfo(profile);
      onClose();
    }
  }, []);
  useEffect(() => {
    getProfileInfo();
    console.log(profileInfo);
    if (!profileInfo) {
      onOpen();
    }
  }, []);

  function validation(target, type) {
    // console.log(target);
    target.nextSibling.removeAttribute('hidden');
    setAllFieldsCorrect(false);
    if (type === 'iin') {
      const regex = /(?=(^([^\d]*?\d){12}$))/;

      if (regex.test(target.value)) {
        // console.log(target.value);
        target.nextSibling.setAttribute('hidden', true);
        setAllFieldsCorrect(true);
      }
    }
    if (type === 'email') {
      const emailRegx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegx.test(target.value)) {
        target.nextSibling.setAttribute('hidden', true);
        setAllFieldsCorrect(true);
      }
    }
    if (type === 'phone') {
      const regex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
      if (regex.test(target.value)) {
        target.nextSibling.setAttribute('hidden', true);
        setAllFieldsCorrect(true);
      }
    }
  }

  return (
    <>
      <Header />
      <ChakraProvider>
        <div className="profilePage">
          <Formik
            // bg="#23252d"
            initialValues={{
              iin: '',
              fio: '',
              mobilePhone: '',
              email: '',
              factualCity: '',
            }}
            onSubmit={async (values) => {
              const validList = [
                ...document.querySelectorAll('.InvalidVaildation'),
              ];
              validList.map((e) => {
                if (e.attributes.length < 2) {
                  setAllFieldsCorrect(false);
                }
                return null;
              });
              if (allFieldsCorrect) {
                const req = await Service('uploadProfile', values);
                window.location.reload();
                onClose();
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={handleSubmit}>
                    <ModalHeader>Введите данные</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl isRequired>
                        <FormLabel>ИИН</FormLabel>
                        <Input
                          placeholder="ИИН"
                          id="iin"
                          name="iin"
                          // value={values.iin}
                          onChange={handleChange}
                          onInput={(e) => {
                            validation(e.target, 'iin');
                          }}
                        />
                        <div className="InvalidVaildation">
                          ИИН должен состоять из 12 цифр!
                        </div>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>ФИО</FormLabel>
                        <Input
                          id="fio"
                          name="fio"
                          onChange={handleChange}
                          placeholder="ФИО"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Номер телефона</FormLabel>
                        <Input
                          placeholder="Телефон"
                          id="mobilePhone"
                          name="mobilePhone"
                          onChange={handleChange}
                          onInput={(e) => {
                            validation(e.target, 'phone');
                          }}
                        />
                        <div className="InvalidVaildation">
                          Номер введён некорректно!
                        </div>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="Email"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onInput={(e) => {
                            validation(e.target, 'email');
                          }}
                        />
                        <div className="InvalidVaildation">
                          Email введён некорректно!
                        </div>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Город</FormLabel>
                        <Input
                          id="factualCity"
                          name="factualCity"
                          onChange={handleChange}
                          placeholder="Город"
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      {allFieldsCorrect ? (
                        <Button
                          colorScheme={'orange'}
                          type="submit"
                          // onClick={handleSubmit}
                        >
                          Отправить
                        </Button>
                      ) : (
                        <Button
                          colorScheme={'red'}
                          opacity="0.5"
                          // type="submit"
                          // onClick={handleSubmit}
                        >
                          Отправить
                        </Button>
                      )}
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            )}
          </Formik>
          <div className="profileImage">
            <img src={picture} alt="pic" />
          </div>
          <div className="profileInfo">
            <div className="profileField">
              <div className="profileFieldElement">
                <b>ФИО:</b>{' '}
                {profileInfo
                  ? profileInfo.fio
                  : 'Данные появятся после заполнения формы'}
              </div>
              <div className="profileFieldElement">
                <b>Номер:</b>{' '}
                {profileInfo
                  ? profileInfo.mobilePhone
                  : 'Данные появятся после заполнения формы'}
              </div>
              <div className="profileFieldElement">
                <b>Email:</b>{' '}
                {profileInfo
                  ? profileInfo.email
                  : 'Данные появятся после заполнения формы'}
              </div>
            </div>
            <div className="profileField">
              <div className="profileFieldElement">
                <b>ИИН:</b>{' '}
                {profileInfo
                  ? profileInfo.iin
                  : 'Данные появятся после заполнения формы'}
              </div>
            </div>
            <div className="profileField">
              <div className="profileFieldElement">
                <b>Город:</b>{' '}
                {profileInfo
                  ? profileInfo.factualCity
                  : 'Данные появятся после заполнения формы'}
              </div>
            </div>
          </div>
          <div className="profileButtons">
            <a className="profileButton" href="/form">
              <div className="formBtn">
                <div className="btnImg">
                  <img src={formBtn} alt="form button" />{' '}
                </div>
                <div className="btnText">ЗАПОЛНИТЬ АНКЕТУ</div>
              </div>
            </a>
            <a className="profileButton" href={`/upload/${profileInfo.iin}`}>
              <div className="formBtn">
                <div className="btnImg">
                  <img src={docBtn} alt="form button" />{' '}
                </div>
                <div className="btnText">ОТПРАВИТЬ ДОКУМЕНТЫ</div>
              </div>
            </a>
            <div className="profilePageText">
              После заполнения анкеты и отправки документов, наш HR менеджер с
              вами свяжется.
            </div>
          </div>
        </div>
      </ChakraProvider>
      <Footer />
    </>
  );
}
