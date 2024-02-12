import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Service from '../service/service';
import Header from '../pageElements/header';
import Footer from '../pageElements/footer';

export default function Anketa() {
  const [isFormdownloaded, setIsFormDownloaded] = useState(false);
  const [isFormUploaded, setIsFormUploaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);

  const getForm = useCallback(async () => {
    // const requestToForm = await fetch('')
    const requestToRecoverForm = await Service('recover');
    const requesToProfileInfo = await Service('getProfile');
    if (requestToRecoverForm) {
      formik.resetForm({
        values: requestToRecoverForm,
      });
    }
    setProfileInfo(requesToProfileInfo);
    formik.setFieldValue('userProfileDto', requesToProfileInfo);
    formik.values.iin = requesToProfileInfo.iin;
    setShowLoader(false);
  });
  useEffect(() => {
    setShowLoader(true);
    getForm();
  }, []);

  const fieldsSize = 175;
  const fSize = '14px';
  const formik = useFormik({
    initialValues: {
      iin: '',
      // userProfileDto: profileInfo,
      // fio: '',
      previousName: '',
      birthDate: '',
      nationality: '',
      citizenship: '',
      birthPlace: '',
      passportSerie: '',
      passportNumber: '',
      passportIssuedAt: '',
      passportIssuedBy: '',
      // email: '',
      homePhone: '',
      workPhone: '',
      // mobilePhone: '',
      relativePhone: '',
      relativeFIO: '',
      relativeLevel: '',
      permanentCity: '',
      permanentRegion: '',
      permanentDistrict: '',
      permanentStreet: '',
      permanentHouse: '',
      permanentCorpus: '',
      permanentApartment: '',
      isAddressMatches: false,
      // factualCity: '',
      factualRegion: '',
      factualDistrict: '',
      factualStreet: '',
      factualHouse: '',
      factualCorpus: '',
      factualApartment: '',
      educationList: [
        {
          qualification: '',
          endDate: '',
          startDate: '',
          speciality: '',
          formOfStudy: '',
          university: '',
        },
      ],
      extracurricularList: [
        {
          endDate: '',
          educationTime: '',
          educationName: '',
          speciality: '',
          degree: '',
        },
      ],
      lastThreeWorkplaces: [
        {
          workPeriod: '',
          organizationName: '',
          organizationType: '',
          organizationAddress: '',
          organizationPhone: '',
          speciality: '',
          employerFio: '',
          employerNumber: '',
          leavingReazon: '',
        },
        {
          workPeriod: '',
          organizationName: '',
          organizationType: '',
          organizationAddress: '',
          organizationPhone: '',
          speciality: '',
          employerFio: '',
          employerNumber: '',
          leavingReazon: '',
        },
        {
          workPeriod: '',
          organizationName: '',
          organizationType: '',
          organizationAddress: '',
          organizationPhone: '',
          speciality: '',
          employerFio: '',
          employerNumber: '',
          leavingReazon: '',
        },
      ],
      threeRecommendationPeople: [
        {
          peopleFio: '',
          peopleWorkPlace: '',
          peopleMajor: '',
          peoplePhone: '',
        },
        {
          peopleFio: '',
          peopleWorkPlace: '',
          peopleMajor: '',
          peoplePhone: '',
        },
        {
          peopleFio: '',
          peopleWorkPlace: '',
          peopleMajor: '',
          peoplePhone: '',
        },
      ],
      marriageStatus: '',
      lifeCompanion: [
        {
          fio: '',
          birthDate: '',
          workPlace: '',
          major: '',
          address: '',
          citizenship: '',
          phone: '',
        },
      ],
      chilrenList: [
        {
          fio: '',
          birthDate: '',
          phone: '',
          studyOrWork: '',
        },
      ],
      relativeList: [
        {
          level: '',
          fio: '',
          birthDate: '',
          workPlace: '',
          major: '',
          phone: '',
        },
      ],
      iscommercialOrganisation: false,
      commercialOrganisationList: [
        {
          ipOrToo: '',
          organizationName: '',
          iin: '',
          address: '',
          type: '',
          phone: '',
        },
      ],
      relativeJusanEmployee: false,
      relativeJusanEmployeeList: [
        {
          level: '',
          fio: '',
          division: '',
          major: '',
        },
      ],
      carOwner: false,
      carList: [
        {
          model: '',
          year: '',
          govNumber: '',
        },
      ],
      military: false,
      svc: false,
      isSVCAnswer: '',
      expiredLoan: false,
      isExpiredLoanAnswer: '',
      criminal: false,
      isCriminalAnswer: '',
      relativeCriminal: false,
      isRelativeCriminalAnswer: '',
      criminalDelo: false,
      isCriminalDeloAnswer: '',
      alimentPayer: false,
      isAlimentPayerAnswer: '',
      hooligan: false,
      isHooliganAnswer: '',
      additionalInfo: '',
      extraIncome: '',
      formConfirm: '',
    },
    onSubmit: async (values) => {
      if (page === 1) {
        // setPage(2);
        const validList = [...document.querySelectorAll('.InvalidVaildation')];
        validList.map((e) => {
          if (e.attributes.length < 2) {
            setAllFieldsCorrect(false);
          }
          return null;
        });
        setPage(2);
      }
      if (page === 2) {
        setPage(3);
      }
      if (page === 3) {
        setPage(4);
      }
      if (page === 4) {
        setPage(5);
      }
      if (page === 5) {
        setPage(6);
      }
      if (page === 6) {
        try {
          setShowLoader(true);
          const requestToUpload = await Service('uploadForm', values);

          if (requestToUpload) {
            setIsFormUploaded(true);
            setShowLoader(false);
          }
        } catch (err) {
          // console.log("step1");
          console.log(err);
        }
      }
    },
  });

  const [allFieldsCorrect, setAllFieldsCorrect] = useState(true);
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
    if (type === 'series') {
      const regex = /-?\d+(.\d{0,})?/;

      if (regex.test(target.value)) {
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
  const [recoverFormBtn, setRecoverFormBtn] = useState(false);

  async function saveForm() {
    await Service('save', formik.values);
  }

  function addBtn(formLabel) {
    if (formLabel === 'specCourses') {
      formik.setFieldValue('extracurricularList', [
        ...formik.values.extracurricularList,
        {
          endDate: '',
          educationTime: '',
          educationName: '',
          speciality: '',
          degree: '',
        },
      ]);
    }

    if (formLabel === 'education') {
      formik.setFieldValue('educationList', [
        ...formik.values.educationList,
        {
          startDate: '',
          endDate: '',
          university: '',
          speciality: '',
          qualification: '',
          formOfStudy: '',
        },
      ]);
    }
    if (formLabel === 'children') {
      formik.setFieldValue('chilrenList', [
        ...formik.values.chilrenList,
        {
          fio: '',
          birthDate: '',
          phone: '',
          studyOrWork: '',
        },
      ]);
    }
    if (formLabel === 'relative') {
      formik.setFieldValue('relativeList', [
        ...formik.values.relativeList,
        {
          level: '',
          fio: '',
          birthDate: '',
          workPlace: '',
          major: '',
          phone: '',
        },
      ]);
    }
    if (formLabel === 'jusanRelative') {
      formik.setFieldValue('relativeJusanEmployeeList', [
        ...formik.values.relativeJusanEmployeeList,
        {
          level: '',
          fio: '',
          division: '',
          major: '',
        },
      ]);
    }
  }
  // if(page === 0) {

  // }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const recoverIIN = useRef('');

  if (page === 1) {
    return (
      <ChakraProvider>
        <Header />
        {showLoader && <ReactLoading color="orange" className="loader" />}
        <div className="bg">
          <Flex
            bg="gray.100"
            align="center"
            justify="center"
            h="100%"
            padding={25}
          >
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>

                  {/* <>
                    <Button colorScheme="orange" onClick={onOpen}>
                      Восстановить анкету
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Введите ваш ИИН</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel>ИИН</FormLabel>
                            <Input
                              ref={recoverIIN}
                              placeholder="Ваш ИИН"
                              onChange={(e) => {
                                setRecoverFormBtn(false);
                                document
                                  .querySelector(".recoverIINError")
                                  .removeAttribute("hidden");

                                const regex = /(?=(^([^\d]*?\d){12}$))/;
                                if (regex.test(e.target.value)) {
                                  console.log("hey");
                                  document
                                    .querySelector(".recoverIINError")
                                    .setAttribute("hidden", true);

                                  setRecoverFormBtn(true);
                                }
                                // console.log(validationSchema.iin);
                              }}
                            />
                            <div className="recoverIINError">
                              ИИН должен состоять из 12 цифр!
                            </div>
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          {recoverFormBtn ? (
                            <Button
                              colorScheme="orange"
                              mr={3}
                              onClick={async () => {
                                const iin = recoverIIN.current.value;
                                // const requestToForm = await fetch('')
                                const requestToRecoverForm = await Service(
                                  "recover",
                                  iin
                                );
                                formik.resetForm({
                                  values: requestToRecoverForm,
                                });
                                onClose();
                              }}
                            >
                              Восстановить
                            </Button>
                          ) : (
                            <Button colorScheme="red" opacity={0.5} mr={3}>
                              Восстановить
                            </Button>
                          )}
                          <Button onClick={onClose}>Отмена</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </> */}

                  <FormControl
                    isRequired={true}
                    display="flex"
                    // justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        ИИН
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="iin"
                        name="iin"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        onInput={(e) => {
                          validation(e.target, 'iin');
                          // console.log(e.target.value);
                        }}
                        value={formik.values.iin}
                      />
                      <div hidden className="InvalidVaildation iinVal">
                        ИИН должен состоять из 12 цифр!
                      </div>
                    </div>

                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        ФИО
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="fio"
                        name="fio"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values?.userProfileDto?.fio}
                      />
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Число, месяц и год рождения
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={175}
                        id="birthDate"
                        name="birthDate"
                        variant="filled"
                        placeholder="Пример: 01.01.1990"
                        onChange={formik.handleChange}
                        value={formik.values.birthDate}
                        type="date"
                      />
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Место рождения
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={175}
                        id="birthPlace"
                        name="birthPlace"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.birthPlace}
                      />
                    </div>

                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Национальность
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="nationality"
                        name="nationality"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.nationality}
                      />
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Гражданство
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="citizenship"
                        name="citizenship"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.citizenship}
                      />
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Email
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={175}
                        id="email"
                        name="email"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        onInput={(e) => {
                          validation(e.target, 'email');
                        }}
                        value={formik.values?.userProfileDto?.email}
                        placeholder="example@email.com"
                      />
                      <div hidden className="InvalidVaildation emailVal">
                        Не правильный формат email!
                      </div>
                    </div>
                  </FormControl>
                  <FormLabel htmlFor="text">
                    Паспорт, удостоверение личности
                  </FormLabel>
                  <FormControl
                    isRequired={true}
                    display={'flex'}
                    // justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <div className="field">
                      <FormControl
                      //  sisRequired={true}={false}
                      >
                        <FormLabel htmlFor="text" fontSize={fSize}>
                          Серия
                        </FormLabel>

                        <Input
                          fontSize={fSize}
                          w={150}
                          id="passportSerie"
                          name="passportSerie"
                          type="text"
                          variant="filled"
                          onChange={formik.handleChange}
                          onInput={(e) => validation(e.target, 'series')}
                          value={formik.values.passportSerie}
                        />
                        <div hidden className="InvalidVaildation pasVal">
                          Только цифры!
                        </div>
                      </FormControl>
                    </div>

                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Номер
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="passportNumber"
                        name="passportNumber"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        onInput={(e) => validation(e.target, 'series')}
                        value={formik.values.passportNumber}
                      />
                      <div hidden className="InvalidVaildation idVal">
                        Только цифры!
                      </div>
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Кем выдан:
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="passportIssuedBy"
                        name="passportIssuedBy"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.passportIssuedBy}
                      />
                    </div>
                    <div className="field">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Когда выдан:
                      </FormLabel>
                      <Input
                        fontSize={fSize}
                        w={150}
                        id="passportIssuedAt"
                        name="passportIssuedAt"
                        type="date"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.passportIssuedAt}
                      />
                    </div>
                  </FormControl>
                  <FormLabel htmlFor="text">
                    Укажите, пожалуйста, номера телефонов, по которым с Вами
                    можно связаться:
                  </FormLabel>
                  <div className="fieldsContainer">
                    <div className="fieldsContex">
                      <FormControl
                        display="flex"
                        flexWrap="wrap"
                        //   justifyContent="space-between"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Домашний телефон:
                          </FormLabel>

                          <Input
                            fontSize={fSize}
                            w={150}
                            id="homePhone"
                            name="homePhone"
                            type="tel"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={formik.values.homePhone}
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal homePhone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Рабочий телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="workPhone"
                            name="workPhone"
                            type="text"
                            variant="filled"
                            onInput={(e) => validation(e.target, 'phone')}
                            onChange={formik.handleChange}
                            value={formik.values.workPhone}
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal workPhone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormControl isRequired={true}>
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Мобильный телефон:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={150}
                              id="mobilePhone"
                              name="mobilePhone"
                              type="phone"
                              variant="filled"
                              onInput={(e) => validation(e.target, 'phone')}
                              onChange={formik.handleChange}
                              value={formik.values?.userProfileDto?.mobilePhone}
                            />
                            <div
                              hidden
                              className="InvalidVaildation phoneVal mobilePhone"
                            >
                              Неверный формат телефона!
                            </div>
                          </FormControl>
                        </div>
                      </FormControl>
                    </div>
                    <div className="fieldsContext">
                      <FormLabel htmlFor="text">
                        Контактные данные родственника или знакомого:
                      </FormLabel>
                      <FormControl
                        isRequired={true}
                        display="flex"
                        flexWrap="wrap"
                        //   justifyContent="space-between"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Контактный телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="relativePhone"
                            name="relativePhone"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={formik.values.relativePhone}
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal relativePhone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="relativeFIO"
                            name="relativeFIO"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.relativeFIO}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Степень родства:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="relativeDegree"
                            name="relativeLevel"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.relativeLevel}
                          />
                        </div>
                      </FormControl>
                    </div>
                  </div>
                  <FormLabel htmlFor="text">
                    Адрес постоянной регистрации:
                  </FormLabel>
                  <div className="fieldsContainer">
                    <div className="fieldsContex">
                      <FormControl
                        display="flex"
                        flexWrap="wrap"
                        isRequired={true}
                        //   justifyContent="space-between"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Город:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="permanentCity"
                            name="permanentCity"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentCity}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Область:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="permanentRegion"
                            name="permanentRegion"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentRegion}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Район:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="permanentDistrict"
                            name="permanentDistrict"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentDistrict}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Улица:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={150}
                            id="permanentStreet"
                            name="permanentStreet"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentStreet}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Дом:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={70}
                            id="permanentHouse"
                            name="permanentHouse"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentHouse}
                          />
                        </div>
                        <div className="field">
                          <FormControl
                          // isRequired={true}={false}
                          >
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Корпус:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={70}
                              id="permanentCorpus"
                              name="permanentCorpus"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.permanentCorpus}
                            />
                          </FormControl>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Квартира:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={70}
                            id="permanentApartment"
                            name="permanentApartment"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.permanentApartment}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <div className="fieldsContext">
                      <FormLabel htmlFor="text">
                        Адрес фактического проживания:
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="isAddressMatches"
                          name="isAddressMatches"
                          onChange={formik.handleChange}
                          isChecked={formik.values.isAddressMatches}
                          colorScheme="orange"
                        >
                          Cовпадает с адресом постоянной регистрации
                        </Checkbox>
                      </div>
                      {!formik.values.isAddressMatches && (
                        <FormControl
                          display="flex"
                          flexWrap="wrap"

                          //   justifyContent="space-between"
                        >
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Город:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={150}
                              id="factualCity"
                              name="factualCity"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values?.userProfileDto?.factualCity}
                            />
                          </div>
                          {console.log(formik.values)}
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Область:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={150}
                              id="factualRegion"
                              name="factualRegion"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualRegion}
                            />
                          </div>
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Район:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={150}
                              id="factualDistrict"
                              name="factualDistrict"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualDistrict}
                            />
                          </div>
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Улица:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={150}
                              id="factualStreet"
                              name="factualStreet"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualStreet}
                            />
                          </div>
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Дом:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={70}
                              id="factualHouse"
                              name="factualHouse"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualHouse}
                            />
                          </div>
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Корпус:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={70}
                              id="factualCorpus"
                              name="factualCorpus"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualCorpus}
                            />
                          </div>
                          <div className="field">
                            <FormLabel htmlFor="text" fontSize={fSize}>
                              Квартира:
                            </FormLabel>
                            <Input
                              fontSize={fSize}
                              w={70}
                              id="factualApartment"
                              name="factualApartment"
                              type="text"
                              variant="filled"
                              onChange={formik.handleChange}
                              value={formik.values.factualApartment}
                            />
                          </div>
                        </FormControl>
                      )}
                    </div>
                  </div>
                  {/* <Checkbox
                id="rememberMe"
                name="rememberMe"
                onChange={formik.handleChange}
                isChecked={formik.values.rememberMe}
                colorScheme="orange"
              >
                Remember me?
              </Checkbox> */}
                  <div className="buttons">
                    {allFieldsCorrect ? (
                      <Button
                        colorScheme="orange"
                        width="30%"
                        // type="submit"
                        marginLeft="50px"
                        type="submit"
                      >
                        Далее
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        width="30%"
                        opacity={0.5}
                        // type="submit"
                        marginLeft="50px"
                      >
                        Далее
                      </Button>
                    )}
                    {formik.values.iin ? (
                      <Button
                        colorScheme="green"
                        width="30%"
                        // type="submit"
                        marginLeft="50px"
                        onClick={saveForm}
                      >
                        Сохранить
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        width="30%"
                        opacity={0.5}
                        // type="submit"
                        marginLeft="50px"
                      >
                        Сохранить
                      </Button>
                    )}
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>

        <Footer />
      </ChakraProvider>
    );
  }
  if (page === 2) {
    return (
      <ChakraProvider>
        <Header />
        <div className="bg">
          <Flex bg="gray.100" align="center" justify="center" p="25px">
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>

                  <FormLabel htmlFor="text">
                    Образование (в том числе неоконченное):
                  </FormLabel>
                  <div className="fieldsContainer">
                    <div className="fieldsContex">
                      {formik.values.educationList.map((education, i) => {
                        return (
                          <div className="fieldsContex" key={i}>
                            <FormControl
                              isRequired={true}
                              display="flex"
                              // justifyContent="space-between"
                              flexWrap="wrap"
                            >
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Дата начала обучения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.startDate`}
                                  name={`educationList.${i}.startDate`}
                                  type="date"
                                  variant="filled"
                                  placeholder="01.01.2000"
                                  onChange={formik.handleChange}
                                  value={education?.startDate}
                                />
                              </div>

                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Дата окончания обучения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.endDate`}
                                  name={`educationList.${i}.endDate`}
                                  type="date"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={education?.endDate}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Полное название учебного заведения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.university`}
                                  name={`educationList.${i}.university`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={education?.university}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Специальность:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.speciality`}
                                  name={`educationList.${i}.speciality`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={education?.speciality}
                                />
                              </div>

                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Форма обучения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.formOfStudy`}
                                  name={`educationList.${i}.formOfStudy`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={education?.formOfStudy}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Квалификация:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`educationList.${i}.qualification`}
                                  name={`educationList.${i}.qualification`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={education?.qualification}
                                />
                              </div>
                            </FormControl>
                          </div>
                        );
                      })}
                      <div className="addBtn">
                        <Button
                          colorScheme="orange"
                          onClick={() => {
                            addBtn('education');
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <FormLabel htmlFor="text">
                    Специальные курсы,школы,стажировки
                  </FormLabel>
                  <div className="fieldsContainer">
                    <div className="fieldsContex">
                      {formik.values.extracurricularList.map((course, i) => {
                        return (
                          <div className="fieldsContex" key={i}>
                            <FormControl
                              isRequired={true}
                              display="flex"
                              // justifyContent="space-between"
                              flexWrap="wrap"
                            >
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Год окончания:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`extracurricularList.${i}.endDate`}
                                  name={`extracurricularList.${i}.endDate`}
                                  type="date"
                                  variant="filled"
                                  placeholder="01.01.2000"
                                  onChange={formik.handleChange}
                                  value={course?.endDate}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Начало обучения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`extracurricularList.${i}.educationTime`}
                                  name={`extracurricularList.${i}.educationTime`}
                                  type="date"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={course?.educationTime}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Полное наименование курсов:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`extracurricularList.${i}.educationName`}
                                  name={`extracurricularList.${i}.educationName`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={course?.educationName}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Специальность:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`extracurricularList.${i}.speciality`}
                                  name={`extracurricularList.${i}.speciality`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={course?.speciality}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Учёная степень, сертификаты:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`extracurricularList.${i}.degree`}
                                  name={`extracurricularList.${i}.degree`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={course?.degree}
                                />
                              </div>
                            </FormControl>
                          </div>
                        );
                      })}
                    </div>
                    <div className="addBtn">
                      <Button
                        colorScheme="orange"
                        onClick={() => {
                          addBtn('specCourses');
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="buttons">
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      Назад
                    </Button>
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      type="submit"
                      // onClick={() => {
                      //   setPage(3);
                      // }}
                    >
                      Далее
                    </Button>
                    <Button
                      colorScheme="green"
                      width="30%"
                      // type="submit"
                      marginLeft="50px"
                      onClick={saveForm}
                    >
                      Сохранить
                    </Button>
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>
        <Footer />
      </ChakraProvider>
    );
  }
  if (page === 3) {
    return (
      <ChakraProvider>
        <Header />
        <div className="bg">
          <Flex bg="gray.100" align="center" justify="center" p="25px">
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>
                  <FormLabel htmlFor="text">
                    Укажите предшествующие 3 (три) места работы в обратном
                    хронологическом порядке, начиная с последнего или
                    действующего места работы:
                  </FormLabel>
                  <div className="fieldsContainer">
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Период работы (месяц, год) :
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].workPeriod`}
                            name={`lastThreeWorkplaces[0].workPeriod`}
                            type="text"
                            variant="filled"
                            placeholder="1 год 2 месяца"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0].workPeriod
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Полное название организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].organizationName`}
                            name={`lastThreeWorkplaces[0].organizationName`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0]
                                .organizationName
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Вид деятельности организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].organizationType`}
                            name={`lastThreeWorkplaces[0].organizationType`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0]
                                .organizationType
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Адрес:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].organizationAddress`}
                            name={`lastThreeWorkplaces[0].organizationAddress`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0]
                                .organizationAddress
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].organizationPhone`}
                            name={`lastThreeWorkplaces[0].organizationPhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.lastThreeWorkplaces[0]
                                .organizationPhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal organization1Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Наименование Должности:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].speciality`}
                            name={`lastThreeWorkplaces[0].speciality`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0].speciality
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].employerFio`}
                            name={`lastThreeWorkplaces[0].employerFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0].employerFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].employerNumber`}
                            name={`lastThreeWorkplaces[0].employerNumber`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.lastThreeWorkplaces[0]
                                .employerNumber
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal employer1Number"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Причина увольнения:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[0].leavingReazon`}
                            name={`lastThreeWorkplaces[0].leavingReazon`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[0].leavingReazon
                            }
                          />
                        </div>
                      </FormControl>
                    </div>
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Период работы (месяц, год) :
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].workPeriod`}
                            name={`lastThreeWorkplaces[1].workPeriod`}
                            type="text"
                            variant="filled"
                            placeholder="1 год 2 месяца"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1].workPeriod
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Полное название организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].organizationName`}
                            name={`lastThreeWorkplaces[1].organizationName`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1]
                                .organizationName
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Вид деятельности организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].organizationType`}
                            name={`lastThreeWorkplaces[1].organizationType`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1]
                                .organizationType
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Адрес:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].organizationAddress`}
                            name={`lastThreeWorkplaces[1].organizationAddress`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1]
                                .organizationAddress
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].organizationPhone`}
                            name={`lastThreeWorkplaces[1].organizationPhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.lastThreeWorkplaces[1]
                                .organizationPhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal organization2Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Наименование Должности:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].speciality`}
                            name={`lastThreeWorkplaces[1].speciality`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1].speciality
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].employerFio`}
                            name={`lastThreeWorkplaces[1].employerFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1].employerFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].employerNumber`}
                            name={`lastThreeWorkplaces[1].employerNumber`}
                            type="text"
                            variant="filled"
                            onInput={(e) => validation(e.target, 'phone')}
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1]
                                .employerNumber
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal employer2Number"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Причина увольнения:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[1].leavingReazon`}
                            name={`lastThreeWorkplaces[1].leavingReazon`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[1].leavingReazon
                            }
                          />
                        </div>
                      </FormControl>
                    </div>
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Период работы (месяц, год) :
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].workPeriod`}
                            name={`lastThreeWorkplaces[2].workPeriod`}
                            type="text"
                            variant="filled"
                            placeholder="1 год 2 месяца"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2].workPeriod
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Полное название организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].organizationName`}
                            name={`lastThreeWorkplaces[2].organizationName`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2]
                                .organizationName
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Вид деятельности организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].organizationType`}
                            name={`lastThreeWorkplaces[2].organizationType`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2]
                                .organizationType
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Адрес:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].organizationAddress`}
                            name={`lastThreeWorkplaces[2].organizationAddress`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2]
                                .organizationAddress
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].organizationPhone`}
                            name={`lastThreeWorkplaces[2].organizationPhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.lastThreeWorkplaces[2]
                                .organizationPhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal organization3Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Наименование Должности:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].speciality`}
                            name={`lastThreeWorkplaces[2].speciality`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2].speciality
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].employerFio`}
                            name={`lastThreeWorkplaces[2].employerFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2].employerFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон руководителя:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].employerNumber`}
                            name={`lastThreeWorkplaces[2].employerNumber`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.lastThreeWorkplaces[2]
                                .employerNumber
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal employer3Number"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Причина увольнения:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`lastThreeWorkplaces[2].leavingReazon`}
                            name={`lastThreeWorkplaces[2].leavingReazon`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.lastThreeWorkplaces[2].leavingReazon
                            }
                          />
                        </div>
                      </FormControl>
                    </div>
                  </div>
                  <FormLabel htmlFor="text">
                    Укажите не менее 3 (трёх) лиц, которые могут дать Вам
                    профессиональную рекомендацию{' '}
                    <i>(бывшие и/или настоящие руководители, коллеги)</i>:
                  </FormLabel>
                  <div className="filedsContainer">
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[0].peopleFio`}
                            name={`threeRecommendationPeople[0].peopleFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[0]
                                .peopleFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Место работы:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[0].peopleWorkPlace`}
                            name={`threeRecommendationPeople[0].peopleWorkPlace`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[0]
                                .peopleWorkPlace
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Должность:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[0].peopleMajor`}
                            name={`threeRecommendationPeople[0].peopleMajor`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[0]
                                .peopleMajor
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[0].peoplePhone`}
                            name={`threeRecommendationPeople[0].peoplePhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.threeRecommendationPeople[0]
                                .peoplePhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal people1Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                      </FormControl>
                    </div>
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[1].peopleFio`}
                            name={`threeRecommendationPeople[1].peopleFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[1]
                                .peopleFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Место работы:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[1].peopleWorkPlace`}
                            name={`threeRecommendationPeople[1].peopleWorkPlace`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[1]
                                .peopleWorkPlace
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Должность:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[1].peopleMajor`}
                            name={`threeRecommendationPeople[1].peopleMajor`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[1]
                                .peopleMajor
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[1].peoplePhone`}
                            name={`threeRecommendationPeople[1].peoplePhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.threeRecommendationPeople[1]
                                .peoplePhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal people2Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                      </FormControl>
                    </div>
                    <div className="filedsContex">
                      <FormControl
                        isRequired={true}
                        display="flex"
                        // justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ФИО:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[2].peopleFio`}
                            name={`threeRecommendationPeople[2].peopleFio`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[2]
                                .peopleFio
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Место работы:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[2].peopleWorkPlace`}
                            name={`threeRecommendationPeople[2].peopleWorkPlace`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[2]
                                .peopleWorkPlace
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Должность:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[2].peopleMajor`}
                            name={`threeRecommendationPeople[2].peopleMajor`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.threeRecommendationPeople[2]
                                .peopleMajor
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`threeRecommendationPeople[2].peoplePhone`}
                            name={`threeRecommendationPeople[2].peoplePhone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.threeRecommendationPeople[2]
                                .peoplePhone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal people3Phone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                  <div className="buttons">
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      onClick={() => {
                        setPage(2);
                      }}
                    >
                      Назад
                    </Button>
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      type="submit"
                      // onClick={() => {
                      //   setPage(4);
                      // }}
                    >
                      Далее
                    </Button>
                    <Button
                      colorScheme="green"
                      width="30%"
                      // type="submit"
                      marginLeft="50px"
                      onClick={saveForm}
                    >
                      Сохранить
                    </Button>
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>
        <Footer />
      </ChakraProvider>
    );
  }
  if (page === 4) {
    return (
      <ChakraProvider>
        <Header />
        <div className="bg">
          <Flex bg="gray.100" align="center" justify="center" p="25px">
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>
                  <FormLabel htmlFor="text">
                    Семейное положение (нужное отметить):
                  </FormLabel>
                  <div className="field">
                    <Select
                      isRequired={true}
                      id="marriageStatus"
                      name="marriageStatus"
                      onChange={formik.handleChange}
                      placeholder="Семейное положение"
                    >
                      <option value="Зарегистрированный брак">
                        Зарегистрированный брак
                      </option>
                      <option value="Не состою в браке">
                        Не состою в браке
                      </option>
                      <option value="Незарегистрированный брак">
                        Незарегистрированный брак
                      </option>
                      <option value="В разводе">В разводе</option>
                      <option value="Вдова(ец)">Вдова(ец)</option>
                    </Select>
                  </div>
                  {formik.values.marriageStatus !== 'Не состою в браке' &&
                    formik.values.marriageStatus !== '' && (
                      <>
                        <FormLabel htmlFor="text">Супруг(а):</FormLabel>
                        <div className="fieldsContainer">
                          <div className="filedsContex">
                            <FormControl
                              isRequired={true}
                              display="flex"
                              // justifyContent="space-between"
                              flexWrap="wrap"
                            >
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  ФИО (полностью):
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].fio`}
                                  name={`lifeCompanion[0].fio`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={formik.values.lifeCompanion[0].fio}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Дата Рождения:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].birthDate`}
                                  name={`lifeCompanion[0].birthDate`}
                                  type="date"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  placeholder="01.01.1999"
                                  value={
                                    formik.values.lifeCompanion[0].birthDate
                                  }
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Место Работы:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].workPlace`}
                                  name={`lifeCompanion[0].workPlace`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.lifeCompanion[0].workPlace
                                  }
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Должность:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].major`}
                                  name={`lifeCompanion[0].major`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={formik.values.lifeCompanion[0].major}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Адрес:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].address`}
                                  name={`lifeCompanion[0].address`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={formik.values.lifeCompanion[0].address}
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Гражданство:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].citizenship`}
                                  name={`lifeCompanion[0].citizenship`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.lifeCompanion[0].citizenship
                                  }
                                />
                              </div>
                              <div className="field">
                                <FormLabel htmlFor="text" fontSize={fSize}>
                                  Телефон:
                                </FormLabel>
                                <Input
                                  fontSize={fSize}
                                  w={fieldsSize}
                                  id={`lifeCompanion[0].phone`}
                                  name={`lifeCompanion[0].phone`}
                                  type="text"
                                  variant="filled"
                                  onChange={formik.handleChange}
                                  onInput={(e) => validation(e.target, 'phone')}
                                  value={formik.values.lifeCompanion[0].phone}
                                />
                                <div
                                  hidden
                                  className="InvalidVaildation phoneVal marriagePhone"
                                >
                                  Неверный формат телефона!
                                </div>
                              </div>
                            </FormControl>
                          </div>
                        </div>
                      </>
                    )}
                  <FormLabel htmlFor="text">Дети:</FormLabel>
                  <div className="fieldsContainer">
                    {formik.values.chilrenList.map((child, i) => {
                      return (
                        <div className="filedsContex" key={i}>
                          <FormControl
                            display="flex"
                            // justifyContent="space-between"
                            flexWrap="wrap"
                          >
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                ФИО (полностью):
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`chilrenList.${i}.fio`}
                                name={`chilrenList.${i}.fio`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={child?.fio}
                              />
                            </div>
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Дата Рождения:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`chilrenList.${i}.birthDate`}
                                name={`chilrenList.${i}.birthDate`}
                                type="date"
                                variant="filled"
                                onChange={formik.handleChange}
                                placeholder="01.01.1999"
                                value={child?.birthDate}
                              />
                            </div>
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Место Учебы/Работы:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`chilrenList.${i}.studyOrWork`}
                                name={`chilrenList.${i}.studyOrWork`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={child?.studyOrWork}
                              />
                            </div>

                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Телефон:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`chilrenList.${i}.phone`}
                                name={`chilrenList.${i}.phone`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                onInput={(e) => validation(e.target, 'phone')}
                                value={child?.phone}
                              />
                              <div
                                hidden
                                className="InvalidVaildation phoneVal childPhone"
                              >
                                Неверный формат телефона!
                              </div>
                            </div>
                          </FormControl>
                        </div>
                      );
                    })}
                  </div>
                  <div className="addBtn">
                    <Button
                      colorScheme="orange"
                      onClick={() => {
                        addBtn('children');
                      }}
                    >
                      +
                    </Button>
                  </div>

                  <FormLabel htmlFor="text">Ближайшие родственники:</FormLabel>
                  <div className="fieldsContainer">
                    {formik.values.relativeList.map((relative, i) => {
                      return (
                        <div className="filedsContex" key={i}>
                          <FormControl
                            display="flex"
                            // justifyContent="space-between"
                            flexWrap="wrap"
                          >
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Степень Родства:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.level`}
                                name={`relativeList.${i}.level`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={relative?.level}
                              />
                            </div>
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                ФИО (полностью):
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.fio`}
                                name={`relativeList.${i}.fio`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={relative?.fio}
                              />
                            </div>

                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Дата Рождения:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.birthDate`}
                                name={`relativeList.${i}.birthDate`}
                                type="date"
                                variant="filled"
                                onChange={formik.handleChange}
                                placeholder="01.01.1999"
                                value={relative?.birthDate}
                              />
                            </div>
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Место Работы:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.workPlace`}
                                name={`relativeList.${i}.workPlace`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={relative?.workPlace}
                              />
                            </div>
                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Должность:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.major`}
                                name={`relativeList.${i}.major`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={relative?.major}
                              />
                            </div>

                            <div className="field">
                              <FormLabel htmlFor="text" fontSize={fSize}>
                                Телефон:
                              </FormLabel>
                              <Input
                                fontSize={fSize}
                                w={fieldsSize}
                                id={`relativeList.${i}.phone`}
                                name={`relativeList.${i}.phone`}
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                onInput={(e) => validation(e.target, 'phone')}
                                value={relative?.phone}
                              />
                              <div
                                hidden
                                className="InvalidVaildation phoneVal relativePhone"
                              >
                                Неверный формат телефона!
                              </div>
                            </div>
                          </FormControl>
                        </div>
                      );
                    })}
                    <div className="addBtn">
                      <Button
                        colorScheme="orange"
                        onClick={() => {
                          addBtn('relative');
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="buttons">
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      onClick={() => {
                        setPage(3);
                      }}
                    >
                      Назад
                    </Button>
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      type="submit"
                      // onClick={() => {
                      //   setPage(5);
                      // }}
                    >
                      Далее
                    </Button>
                    <Button
                      colorScheme="green"
                      width="30%"
                      // type="submit"
                      marginLeft="50px"
                      onClick={saveForm}
                    >
                      Сохранить
                    </Button>
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>{' '}
        <Footer />{' '}
      </ChakraProvider>
    );
  }
  if (page === 5) {
    return (
      <ChakraProvider>
        <Header />
        <div className="bg">
          <Flex bg="gray.100" align="center" justify="center" p="25px">
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>
                  <FormLabel htmlFor="text">
                    Дополнительная информация:
                  </FormLabel>
                  <FormLabel htmlFor="text">
                    Являетесь ли Вы руководителем/учредителем (соучредителем),
                    членом совета директоров и/или правления коммерческих
                    организаций (ИП/ТОО):
                  </FormLabel>

                  <div className="checker">
                    <Checkbox
                      id="iscommercialOrganisation"
                      name="iscommercialOrganisation"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iscommercialOrganisation}
                      colorScheme="orange"
                    >
                      Да
                    </Checkbox>
                  </div>
                  <div className="fieldsContainer">
                    {formik.values.iscommercialOrganisation && (
                      <div className="fieldsContex">
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Укажите ИП/ТОО:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].ipOrToo`}
                            name={`commercialOrganisationList[0].ipOrToo`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.iscommercialOrganisation.ipOrToo
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Наименование:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].organizationName`}
                            name={`commercialOrganisationList[0].organizationName`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.iscommercialOrganisation
                                .organizationName
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            ИИН Организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].iin`}
                            name={`commercialOrganisationList[0].iin`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.commercialOrganisationList[0].iin
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Адрес организации:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].address`}
                            name={`commercialOrganisationList[0].address`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.commercialOrganisationList[0]
                                .address
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Вид деятельности:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].type`}
                            name={`commercialOrganisationList[0].type`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={
                              formik.values.commercialOrganisationList[0].type
                            }
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Телефон:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id={`commercialOrganisationList[0].phone`}
                            name={`commercialOrganisationList[0].phone`}
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            onInput={(e) => validation(e.target, 'phone')}
                            value={
                              formik.values.commercialOrganisationList[0].phone
                            }
                          />
                          <div
                            hidden
                            className="InvalidVaildation phoneVal organizationPhone"
                          >
                            Неверный формат телефона!
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="fieldsContex">
                      <FormLabel htmlFor="text">
                        Имеете ли Вы родственников, членов семьи, работающих в
                        АО " Jusan Bank" или связанных с деятельностью АО "Jusan
                        Bank"
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="relativeJusanEmployee"
                          name="relativeJusanEmployee"
                          onChange={formik.handleChange}
                          isChecked={formik.values.relativeJusanEmployee}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>

                      {formik.values.relativeJusanEmployee && (
                        <>
                          {formik.values.relativeJusanEmployeeList.map(
                            (relative, i) => {
                              return (
                                <div className="fieldsContainer">
                                  <div className="fieldsContex">
                                    <FormControl
                                      isRequired={true}
                                      display="flex"
                                      // justifyContent="space-between"
                                      flexWrap="wrap"
                                    >
                                      <div className="field">
                                        <FormLabel
                                          htmlFor="text"
                                          fontSize={fSize}
                                        >
                                          Степень родства:
                                        </FormLabel>
                                        <Input
                                          fontSize={fSize}
                                          w={fieldsSize}
                                          id={`relativeJusanEmployeeList.${i}.level`}
                                          name={`relativeJusanEmployeeList.${i}.level`}
                                          type="text"
                                          variant="filled"
                                          onChange={formik.handleChange}
                                          value={relative?.level}
                                        />
                                      </div>
                                      <div className="field">
                                        <FormLabel
                                          htmlFor="text"
                                          fontSize={fSize}
                                        >
                                          ФИО:
                                        </FormLabel>
                                        <Input
                                          fontSize={fSize}
                                          w={fieldsSize}
                                          id={`relativeJusanEmployeeList.${i}.fio
`}
                                          name={`relativeJusanEmployeeList.${i}.fio
`}
                                          type="text"
                                          variant="filled"
                                          onChange={formik.handleChange}
                                          value={relative?.fio}
                                        />
                                      </div>
                                      <div className="field">
                                        <FormLabel
                                          htmlFor="text"
                                          fontSize={fSize}
                                        >
                                          Подразделение:
                                        </FormLabel>
                                        <Input
                                          fontSize={fSize}
                                          w={fieldsSize}
                                          id={`relativeJusanEmployeeList.${i}.divison`}
                                          name={`relativeJusanEmployeeList.${i}.divison`}
                                          type="text"
                                          variant="filled"
                                          onChange={formik.handleChange}
                                          value={relative?.division}
                                        />
                                      </div>
                                      <div className="field">
                                        <FormLabel
                                          htmlFor="text"
                                          fontSize={fSize}
                                        >
                                          Должность:
                                        </FormLabel>
                                        <Input
                                          fontSize={fSize}
                                          w={fieldsSize}
                                          id={`relativeJusanEmployeeList.${i}.major`}
                                          name={`relativeJusanEmployeeList.${i}.major`}
                                          type="text"
                                          variant="filled"
                                          onChange={formik.handleChange}
                                          value={relative?.major}
                                        />
                                      </div>
                                    </FormControl>
                                  </div>
                                </div>
                              );
                            }
                          )}
                          <div className="addBtn">
                            <Button
                              colorScheme="orange"
                              onClick={() => {
                                addBtn('jusanRelative');
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="buttons">
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      onClick={() => {
                        setPage(4);
                      }}
                    >
                      Назад
                    </Button>
                    <Button
                      colorScheme="orange"
                      width="30%"
                      marginLeft="50px"
                      type="submit"
                      // onClick={() => {
                      //   setPage(6);
                      // }}
                    >
                      Далее
                    </Button>
                    <Button
                      colorScheme="green"
                      width="30%"
                      // type="submit"
                      marginLeft="50px"
                      onClick={saveForm}
                    >
                      Сохранить
                    </Button>
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>
        <Footer />{' '}
      </ChakraProvider>
    );
  }
  if (page === 6) {
    return (
      <ChakraProvider>
        <Header />
        {showLoader && <ReactLoading color="orange" className="loader" />}
        <div className="bg">
          <Flex
            bg="gray.100"
            align="center"
            justify="center"
            p="25px"
            margin="0 auto"
          >
            <Box bg="white" p={6} rounded="md" w={'80%'}>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormLabel htmlFor="text">
                    АНКЕТА КАНДИДАТА (<span style={{ color: 'red' }}>*</span>
                    обязательные поля)
                  </FormLabel>
                  <FormLabel htmlFor="text">
                    Дополнительная информация:
                  </FormLabel>
                  <FormLabel htmlFor="text">Наличие Автомобиля</FormLabel>
                  <div className="checker">
                    <Checkbox
                      id="carOwner"
                      name="carOwner"
                      onChange={formik.handleChange}
                      isChecked={formik.values.carOwner}
                      colorScheme="orange"
                    >
                      Да
                    </Checkbox>
                  </div>
                  {formik.values.carOwner && (
                    <div className="fieldsContainer">
                      <div className="fieldsContex">
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Модель:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="carList[0].model"
                            name="carList[0].model"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.carList[0].model}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Гос.Номер:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="carList[0].govNumber"
                            name="carList[0].govNumber"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.carList[0].govNumber}
                          />
                        </div>
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Год выпуска:
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="carList[0].year"
                            name="carList[0].year"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.carList[0].year}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="field">
                    <span style={{ color: 'red' }}>*</span>
                    <Select
                      isRequired={true}
                      id="military"
                      name="military"
                      onChange={formik.handleChange}
                      placeholder="Отношение к воинской службе"
                    >
                      <option value={true}>Военнообязанный</option>
                      <option value={false}>невоеннообязанный </option>
                    </Select>
                  </div>
                  <FormLabel htmlFor="text">
                    Внимательно прочитайте и ответьте, пожалуйста, на следующие
                    вопросы
                  </FormLabel>
                  <div className="fieldsContex">
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Имеете ли Вы право на льготы согласно действующему
                        законодательству?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="svc"
                          name="svc"
                          onChange={formik.handleChange}
                          isChecked={formik.values.svc}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.svc && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isSVCAnswer"
                            name="isSVCAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isSVCAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Имеете ли Вы просроченный заем?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="expiredLoan"
                          name="expiredLoan"
                          onChange={formik.handleChange}
                          isChecked={formik.values.expiredLoan}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.expiredLoan && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isExpiredLoanAnswer"
                            name="isExpiredLoanAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isExpiredLoanAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Привлекались ли Вы к уголовной ответственности?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="criminal"
                          name="criminal"
                          onChange={formik.handleChange}
                          isChecked={formik.values.criminal}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.criminal && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isCriminalAnswer"
                            name="isCriminalAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isCriminalAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Привлекались ли Ваши близкие родственники, члены семьи к
                        уголовной ответственности?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="relativeCriminal"
                          name="relativeCriminal"
                          onChange={formik.handleChange}
                          isChecked={formik.values.relativeCriminal}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.relativeCriminal && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isRelativeCriminalAnswer"
                            name="isRelativeCriminalAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isRelativeCriminalAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Против Вас когда-либо возбуждалось уголовное дело?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="criminalDelo"
                          name="criminalDelo"
                          onChange={formik.handleChange}
                          isChecked={formik.values.criminalDelo}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.criminalDelo && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isCriminalDeloAnswer"
                            name="isCriminalDeloAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isCriminalDeloAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Выплачиваете ли Вы алименты?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="alimentPayer"
                          name="alimentPayer"
                          onChange={formik.handleChange}
                          isChecked={formik.values.alimentPayer}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.alimentPayer && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isAlimentPayerAnswer"
                            name="isAlimentPayerAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isAlimentPayerAnswer}
                          />
                        </div>
                      )}
                    </div>
                    <div className="fieldAnsw">
                      <FormLabel htmlFor="text" fontSize={fSize}>
                        Привлекались ли Вы к административной ответственности?
                      </FormLabel>
                      <div className="checker">
                        <Checkbox
                          id="hooligan"
                          name="hooligan"
                          onChange={formik.handleChange}
                          isChecked={formik.values.hooligan}
                          colorScheme="orange"
                        >
                          Да
                        </Checkbox>
                      </div>
                      {formik.values.hooligan && (
                        <div className="field">
                          <FormLabel htmlFor="text" fontSize={fSize}>
                            Уточните
                          </FormLabel>
                          <Input
                            fontSize={fSize}
                            w={fieldsSize}
                            id="isHooliganAnswer"
                            name="isHooliganAnswer"
                            type="text"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.isHooliganAnswer}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <FormLabel htmlFor="text" fontSize={fSize}>
                      Дополнительная информация о себе:
                    </FormLabel>
                    <Textarea
                      fontSize={fSize}
                      id="additionalInfo"
                      name="additionalInfo"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.additionalInfo}
                    />
                  </div>
                  <div className="field">
                    <FormLabel htmlFor="text" fontSize={fSize}>
                      Есть ли у Вас дополнительный доход (работа,
                      дистрибьютерство/представительство в торговых компаниях):
                    </FormLabel>
                    <Textarea
                      fontSize={fSize}
                      id="extraIncome"
                      name="extraIncome"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.extraIncome}
                    />
                  </div>

                  <div className="formConfirm">
                    <Checkbox
                      id="formConfirm"
                      name="formConfirm"
                      onChange={formik.handleChange}
                      isChecked={formik.values.formConfirm}
                      colorScheme="orange"
                    >
                      <div className="formConfirmText">
                        В соответствии с требованиями Закона Республики
                        Казахстан «О персональных данных и их защите» даю АО "
                        Jusan Bank" (далее – «Банк») безусловное согласие на
                        сбор, обработку, хранение и распространение Банком
                        информации обо мне [и представляемом мной лице], включая
                        мои персональные данные [и персональные данные
                        представляемого мной лица], в том числе биометрические,
                        зафиксированные на электронном, бумажном и любом ином
                        носителе, а также происходящие в них в будущем изменения
                        и дополнения, в связи с возникновением с Банком, в том
                        числе в будущем, любых правоотношений, связанных,
                        включая, но не ограничиваясь, с банковским и/или иным
                        обслуживанием. <br />
                        При этом мои персональные данные [и персональные данные
                        представляемого мной лица] должны распространяться
                        Банком с учетом ограничений, установленных
                        законодательством Республики Казахстан, в том числе, ст.
                        50 Закона Республики Казахстан «О банках и банковской
                        деятельности в Республике Казахстан».
                      </div>
                    </Checkbox>
                  </div>
                  <div className="buttons">
                    <Button
                      colorScheme="orange"
                      width="25%"
                      marginLeft="50px"
                      onClick={() => {
                        setPage(5);
                      }}
                    >
                      Назад
                    </Button>
                    {formik.values.formConfirm ? (
                      <Button
                        colorScheme="blue"
                        marginLeft="50px"
                        width="50%"
                        // onClick={() => {

                        // }}
                        type="submit"
                      >
                        Подписать Анкету
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        opacity={0.5}
                        marginLeft="50px"
                        width="50%"
                        // onClick={() => {

                        // }}
                        // type="submit"
                      >
                        Подписать Анкету
                      </Button>
                    )}

                    {isFormUploaded ? (
                      <Button
                        colorScheme="green"
                        width="40%"
                        marginLeft="10px"
                        onClick={async () => {
                          setShowLoader(true);
                          const requestToDownload = await Service(
                            'downloadForm',
                            formik.values
                          );
                          if (requestToDownload) {
                            setIsFormDownloaded(true);
                            setShowLoader(false);
                          }
                        }}
                      >
                        Скачать Анкету
                      </Button>
                    ) : (
                      <Button
                        opacity={0.5}
                        colorScheme="red"
                        width="40%"
                        marginLeft="10px"
                        onClick={() => {}}
                      >
                        Скачать Анкету
                      </Button>
                    )}
                    {isFormdownloaded ? (
                      <>
                        <Button
                          colorScheme="green"
                          width="25%"
                          marginLeft="50px"
                          // type="submit"
                          onClick={() => {
                            window.location = `/upload/${formik.values.iin}`;
                          }}
                        >
                          Далее
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          opacity={0.5}
                          colorScheme="red"
                          width="25%"
                          marginLeft="50px"
                          // type="submit"
                          onClick={() => {
                            // console.log(form);
                          }}
                        >
                          Далее
                        </Button>
                      </>
                    )}
                    <Button
                      colorScheme="green"
                      width="30%"
                      // type="submit"
                      marginLeft="50px"
                      onClick={saveForm}
                    >
                      Сохранить
                    </Button>
                  </div>
                </VStack>
              </form>
            </Box>
          </Flex>
        </div>
        <Footer />{' '}
      </ChakraProvider>
    );
  }
  return <div className="sd">{page}</div>;
}
