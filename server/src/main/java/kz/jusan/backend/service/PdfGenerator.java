package kz.jusan.backend.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.TextField;
import kz.jusan.backend.dto.*;
import kz.jusan.backend.entity.AnketaEntity;
import org.springframework.security.core.parameters.P;
import org.w3c.dom.Text;


public class PdfGenerator {
    public static String FILE = "src/main/resources/templates/output.pdf";
    public static final String TIMES_NEW_ROMAN = "static/fonts/kztimesnewroman.ttf";
    public static final String TIMES_BOLD = "/static/fonts/TIMCYRB.ttf";
    public static final String TIMES_ITALIC = "/static/fonts/TIMCYRI.ttf";
    public static final String TIMES_BOLD_ITALIC = "/static/fonts/TIMCYRBI.ttf";
    public static final String PODPIS_FONT = "/static/fonts/cassandra.ttf";
    static Font normal10;
    static Font normal11;
    static Font normal12;
    static Font bold10;
    static Font bold12;
    static Font italic10;
    static Font italic12;
    static Font boldItalic12;
    static Font podpisFont;
    static {
        try {
            BaseFont bfNormal = BaseFont.createFont(TIMES_NEW_ROMAN, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            BaseFont bfBold = BaseFont.createFont(TIMES_BOLD, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            BaseFont bfItalic = BaseFont.createFont(TIMES_ITALIC, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            BaseFont bfBoldItalic = BaseFont.createFont(TIMES_BOLD_ITALIC, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            BaseFont bfPodpisFont = BaseFont.createFont(PODPIS_FONT, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            normal10 = new Font(bfNormal,10, Font.NORMAL);
            normal11 = new Font(bfNormal,11, Font.NORMAL);
            normal12 = new Font(bfNormal,12, Font.NORMAL);
            bold10 = new Font(bfBold,10, Font.NORMAL);
            bold12 = new Font(bfBold,12, Font.NORMAL);
            italic10 = new Font(bfItalic,10, Font.NORMAL);
            italic12 = new Font(bfItalic,12, Font.NORMAL);
            boldItalic12 = new Font(bfBoldItalic,12, Font.NORMAL);
            podpisFont = new Font(bfPodpisFont, 15, Font.NORMAL);
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static void addMetaData(Document document, AnketaEntity anketa) {
        document.addTitle(anketa.getIin());
        document.addSubject("Using iText");
        document.addKeywords("Java, PDF, iText");
        document.addAuthor("Lars Vogel");
        document.addCreator("Lars Vogel");
    }

    public static void addContent(Document document, AnketaEntity anketa) throws DocumentException, IOException {
        Paragraph header1 = new Paragraph("Приложение  2\n", bold12);
        header1.setAlignment(Element.ALIGN_RIGHT);
        document.add(header1);
        Paragraph header2 = new Paragraph(
                "к Правилам оформления приема на работу \n" +
                        "и прекращения трудового договора \n" +
                        "в АО «First Heartland Jýsan Bank» \n\n", italic10);
        header2.setAlignment(Element.ALIGN_RIGHT);
        document.add(header2);
        document.add(new Paragraph("АНКЕТА КАНДИДАТА      "+anketa.getIin(), bold12));
        document.add(new Paragraph("\n"));
        createTable1(document, anketa);
        document.add(new Paragraph("Укажите, пожалуйста, номера телефонов, по которым с Вами можно связаться:", normal12));
        document.add(new Paragraph("\n"));
        createTable2(document, anketa, normal10);
        document.add(new Paragraph("Местожительство:", normal12));
        document.add(new Paragraph("\n"));
        createTable3(document, anketa);
        document.add(new Paragraph("Образование (в том числе неоконченное):", bold12));

        document.add(new Paragraph("\n"));createTable4(document, anketa, normal10);
        document.add(new Paragraph("Специальные курсы, школы, стажировки, семинары:", bold12));
        List<String> headers = new ArrayList<String>(Arrays.asList(
                "Год окончания",
                "Длительность обучения",
                "Полное наименование курсовя",
                "Специальность",
                "Учёная степень, сертификаты"));
        document.add(new Paragraph("\n"));
        createTable5(document, anketa, normal10, headers);
        document.add(new Paragraph("Укажите предшествующие 3 (три) места работы в обратном хронологическом " +
                "порядке, начиная с последнего или действующего места работы:", bold12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "Период работы (месяц, год)",
                "Полное название организации, вид деятельности, адрес, телефон",
                "Наименование должности",
                "ФИО руководителя, телефон",
                "Причина увольнения"));
        createTable6(document, anketa, normal10, headers);
        document.add(new Paragraph("Укажите не менее 3 (трёх) лиц, которые могут дать Вам профессиональную " +
                "рекомендацию (бывшие и/или настоящие руководители, коллеги):", bold12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "ФИО",
                "Место работы, должность",
                "Телефон"
        ));
        createTable7(document, anketa, normal10, headers);
        document.add(new Paragraph("\n"));
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Семейное положение: ", bold12));
        table.addCell(new Paragraph(anketa.getMarriageStatus(), normal10));
        document.add(table);
        document.add(new Paragraph("Супруг (-а)", normal12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "ФИО (полностью), дата рождения",
                "Место работы",
                "Должность",
                "Адрес места жительства",
                "Гражданство",
                "Контакты"));
        createTable8(document, anketa, normal10, headers);
        document.add(new Paragraph("Дети:", normal12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "ФИО (полностью)",
                "Дата рождения",
                "Телефон",
                "Место учебы, работы"));
        createTable9(document, anketa, normal10, headers);
        document.add(new Paragraph("Ближайшие родственники:", normal12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "Степень родства",
                "ФИО",
                "Дата рождения",
                "Место работы, должность",
                "Домашний адрес, номер телефона / сотового"));
        createTable10(document, anketa, normal10, headers);
        document.add(new Paragraph("Дополнительная информация:", normal12));
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "Являетесь ли Вы руководителем/учредителем (соучредителем), членом совета директоров и/или правления коммерческих организаций (ИП/ТОО)",
                "Наименование, ИНН, адрес, вид деятельности, телефон"));
        createTable11(document, anketa, normal10, headers);
        document.add(new Paragraph("\n"));
        PdfPTable isRelativeTable = new PdfPTable(2);
        isRelativeTable.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        isRelativeTable.setWidthPercentage(100);
        isRelativeTable.addCell(new Paragraph("Имеете ли Вы родственников, членов семьи, работающих в АО \" Jusan Bank\" " +
                "или связанных с деятельностью  АО \"Jusan Bank\"", normal10));
        String isRelativeJusan = getBoolAsYesOrNo(anketa.isRelativeJusanEmployee());
        isRelativeTable.addCell(new Paragraph(isRelativeJusan, bold10));
        document.add(isRelativeTable);
        headers = new ArrayList<>(Arrays.asList(
                "Степень родства",
                "ФИО",
                "Подразделение, должность"));
        createTable12(document, anketa, normal10, headers);
        document.add(new Paragraph("\n"));
        createTable13(document, anketa);
        document.add(new Paragraph("\n"));
        createTable14(document, anketa, normal10);
        document.add(new Paragraph("\n"));
        createTable15(document, anketa);
        document.add(new Paragraph("\n"));
        headers = new ArrayList<>(Arrays.asList(
                "Внимательно прочитайте и ответьте, пожалуйста, на следующие вопросы",
                "ДА",
                "НЕТ",
                "Раскрыть"));
        createTable16(document, anketa, headers);
        document.add(new Paragraph("\n"));
        createTable17(document, anketa, normal10);
        document.add(new Paragraph("\nВ соответствии с требованиями Закона Республики Казахстан «О персональных " +
                "данных и их защите» даю  АО \" Jusan Bank\" (далее – «Банк») безусловное согласие на сбор, " +
                "обработку, хранение и распространение Банком информации обо мне [и представляемом мной лице]," +
                " включая мои персональные данные [и персональные данные представляемого мной лица], в том числе" +
                " биометрические, зафиксированные на электронном, бумажном и любом ином носителе, а также происходящие" +
                " в них в будущем изменения и дополнения, в связи с возникновением с Банком, в том числе в будущем," +
                " любых правоотношений, связанных, включая, но не ограничиваясь, с банковским и/или иным обслуживанием.\n" +
                "При этом мои персональные данные [и персональные данные представляемого мной лица] должны " +
                "распространяться Банком с учетом ограничений, установленных законодательством Республики Казахстан," +
                " в том числе, ст. 50 Закона Республики Казахстан «О банках и банковской деятельности в Республике" +
                " Казахстан».", normal11));
        String date = DateTimeFormatter.ofPattern("Дата  dd / MMMM / yyyy г.")
                .withLocale(new Locale("ru")).format(LocalDate.now());
        String podpis = "";
        if (anketa.getUserProfile().getFio().length()>=8){
            podpis += anketa.getUserProfile().getFio().substring(0,8);
        } else {
            podpis += anketa.getUserProfile().getFio();
        }
        Paragraph paragraph = new Paragraph();
        Chunk chunk1 = new Chunk("\n" + "ФИО " + anketa.getUserProfile().getFio() + "   Подпись _________", normal12);
        Chunk chunk2 = new Chunk(podpis + "_________\n", podpisFont);
        paragraph.add(chunk1);
        paragraph.add(chunk2);
        document.add(paragraph);
        document.add(new Paragraph("\n" + date+"\t", normal12));
    }

    private static void createTable1(Document document, AnketaEntity anketa)
            throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("ФИО", bold12));
        table.addCell(new Paragraph(anketa.getUserProfile().getFio()+" ", normal12));
        table.addCell(new Paragraph("Если Вы сменили фамилию, укажите, пожалуйста, прежнюю", italic10));
        table.addCell(new Paragraph(anketa.getPreviousName()+" ", normal12));
        table.addCell(new Paragraph("Число, месяц и год рождения, место рождения", bold12));
        table.addCell(new Paragraph(anketa.getBirthDate() + ", " + anketa.getBirthPlace(), normal12));
        table.addCell(new Paragraph("Национальность", bold12));
        table.addCell(new Paragraph(anketa.getNationality()+" ", normal12));
        table.addCell(new Paragraph("Гражданство", bold12));
        table.addCell(new Paragraph(anketa.getCitizenship()+" ", normal12));
        table.addCell(new Paragraph("Паспорт, удостоверение личности", bold12));
        PdfPTable passportDetails = new PdfPTable(2);
        passportDetails.addCell(new Paragraph("Серия: "+ anketa.getPassportSerie() + ", " + "Номер: " + anketa.getPassportNumber(), normal12));
        passportDetails.addCell(new Paragraph("Кем и когда выдан: " + anketa.getPassportIssuedBy() + ", "+ anketa.getPassportIssuedAt(), normal12));
        table.addCell(passportDetails);
        document.add(table);
    }

    private static void createTable2(Document document, AnketaEntity anketa, Font font) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Телефоны", font));
        PdfPTable phoneTypes = new PdfPTable(2);
        phoneTypes.addCell(new Paragraph("домашний", font));
        phoneTypes.addCell(new Paragraph(anketa.getHomePhone()+" ", font));
        phoneTypes.addCell(new Paragraph("рабочий", font));
        phoneTypes.addCell(new Paragraph(anketa.getWorkPhone()+" ", font));
        phoneTypes.addCell(new Paragraph("мобильный", font));
        phoneTypes.addCell(new Paragraph(anketa.getUserProfile().getMobilePhone()+" ", font));
        phoneTypes.addCell(new Paragraph("Контактный, ФИО, степень родства (родственника и/или знакомого)", font));
        phoneTypes.addCell(new Paragraph(anketa.getRelativePhone()+", "+anketa.getRelativeFIO()+", "+anketa.getRelativeLevel(), font));
        phoneTypes.addCell(new Paragraph("e-mail", font));
        phoneTypes.addCell(new Paragraph(anketa.getUserProfile().getEmail()+" ", font));
        table.addCell(phoneTypes);
        document.add(table);
    }

    private static void createTable3(Document document, AnketaEntity anketa) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Адрес постоянной регистрации:", bold10));
        table.addCell(new Paragraph("Адрес фактического проживания:", bold10));
        table.addCell(new Paragraph("Город: "+anketa.getPermanentCity(), normal10));
        table.addCell(new Paragraph("Город: "+anketa.getUserProfile().getFactualCity(), normal10));
        table.addCell(new Paragraph("Область: "+anketa.getPermanentRegion(), normal10));
        table.addCell(new Paragraph("Область: "+anketa.getFactualRegion(), normal10));
        table.addCell(new Paragraph("Район: "+anketa.getPermanentDistrict(), normal10));
        table.addCell(new Paragraph("Район: "+anketa.getFactualDistrict(), normal10));
        table.addCell(new Paragraph("Улица: "+anketa.getPermanentStreet(), normal10));
        table.addCell(new Paragraph("Улица: "+anketa.getFactualStreet(), normal10));
        table.addCell(new Paragraph(String.format("Дом: %s, Корпус: %s, Квартира: %s",
                anketa.getPermanentHouse(), anketa.getPermanentCorpus(), anketa.getPermanentApartment()), normal10));
        table.addCell(new Paragraph(String.format("Дом: %s, Корпус: %s, Квартира: %s",
                anketa.getFactualHouse(), anketa.getFactualCorpus(), anketa.getFactualApartment()), normal10));
        document.add(table);
    }

    private static void createTable4(Document document, AnketaEntity anketa, Font font) throws DocumentException {
        PdfPTable table = new PdfPTable(4);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Даты начала и окончания обучения", font));
        table.addCell(new Paragraph("Полное название учебного заведения", font));
        table.addCell(new Paragraph("Специальность,\n" + "форма обучения"+anketa.getPermanentCity(), font));
        table.addCell(new Paragraph("Квалификация"+anketa.getUserProfile().getFactualCity(), font));
        for (EducationDto educationDto: anketa.getEducationList()) {
            PdfPTable dates = new PdfPTable(2);
            dates.addCell(new Paragraph(educationDto.getStartDate(), font));
            dates.addCell(new Paragraph(educationDto.getEndDate(), font));
            table.addCell(dates);
            table.addCell(new Paragraph(educationDto.getUniversity(), font));
            table.addCell(new Paragraph(educationDto.getSpeciality() + ", " + educationDto.getFormOfStudy(), font));
            table.addCell(new Paragraph(educationDto.getQualification(), font));
        }
        document.add(table);
    }

    public static void createTable5(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (ExtracurricularDto extra: anketa.getExtracurricularList()) {
            table.addCell(new Paragraph(extra.getEndDate(), font));
            table.addCell(new Paragraph(extra.getEducationTime(), font));
            table.addCell(new Paragraph(extra.getEducationName(), font));
            table.addCell(new Paragraph(extra.getSpeciality(), font));
            table.addCell(new Paragraph(extra.getDegree(), font));
        }
        document.add(table);
    }

    public static void createTable6(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (WorkplaceDto workplace: anketa.getLastThreeWorkplaces()) {
            table.addCell(new Paragraph(workplace.getWorkPeriod(), font));
            table.addCell(new Paragraph(workplace.getOrganizationName()+", "+workplace.getOrganizationType()+", " +
                    workplace.getOrganizationAddress()+", "+workplace.getOrganizationPhone(), font));
            table.addCell(new Paragraph(workplace.getSpeciality(), font));
            table.addCell(new Paragraph(workplace.getEmployerFio()+", "+workplace.getEmployerNumber(), font));
            table.addCell(new Paragraph(workplace.getLeavingReazon(), font));
        }
        document.add(table);
    }

    public static void createTable7(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (RecommendationPersonDto recomPerson: anketa.getThreeRecommendationPeople()) {
            table.addCell(new Paragraph(recomPerson.getPeopleFio(), font));
            table.addCell(new Paragraph(recomPerson.getPeopleWorkPlace()+", "+recomPerson.getPeopleMajor(), font));
            table.addCell(new Paragraph(recomPerson.getPeoplePhone(), font));
        }
        document.add(table);
    }

    public static void createTable8(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (LifeCompanionDto companion: anketa.getLifeCompanion()) {
            table.addCell(new Paragraph(companion.getFio()+", "+companion.getBirthDate(), font));
            table.addCell(new Paragraph(companion.getWorkPlace(), font));
            table.addCell(new Paragraph(companion.getMajor(), font));
            table.addCell(new Paragraph(companion.getAddress(), font));
            table.addCell(new Paragraph(companion.getCitizenship(), font));
            table.addCell(new Paragraph(companion.getPhone(), font));
        }
        document.add(table);
    }

    public static void createTable9(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (ChildDto child: anketa.getChilrenList()) {
            table.addCell(new Paragraph(child.getFio(), font));
            table.addCell(new Paragraph(child.getBirthDate(), font));
            table.addCell(new Paragraph(child.getPhone(), font));
            table.addCell(new Paragraph(child.getStudyOrWork(), font));
        }
        document.add(table);
    }

    public static void createTable10(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (RelativeDto relative: anketa.getRelativeList()) {
            table.addCell(new Paragraph(relative.getLevel(), font));
            table.addCell(new Paragraph(relative.getFio(), font));
            table.addCell(new Paragraph(relative.getBirthDate(), font));
            table.addCell(new Paragraph(relative.getWorkPlace() + ", "+ relative.getMajor(), font));
            table.addCell(new Paragraph(relative.getPhone(), font));
        }
        document.add(table);
    }

    public static void createTable11(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (CommercialOrganisationDto comm: anketa.getCommercialOrganisationList()) {
            table.addCell(new Paragraph(comm.getIpOrToo(), font));
            table.addCell(new Paragraph(comm.getOrganizationName()+", "+comm.getIin()+", "+comm.getAddress()+", "
                    + comm.getType() + ", "+comm.getPhone(), font));
        }
        document.add(table);
    }

    public static void createTable12(Document document, AnketaEntity anketa, Font font, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, font));
        }
        for (RelativeJusanEmployeeDto relative: anketa.getRelativeJusanEmployeeList()) {
            table.addCell(new Paragraph(relative.getLevel(), font));
            table.addCell(new Paragraph(relative.getFio(), font));
            table.addCell(new Paragraph(relative.getDivision()+", "+relative.getMajor(), font));
        }
        document.add(table);
    }

    public static void createTable13(Document document, AnketaEntity anketa) throws DocumentException {
        PdfPTable table = new PdfPTable(3);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Наличие автомобиля", normal10));
        table.addCell(new Paragraph(getBoolAsYesOrNo(anketa.isCarOwner()), bold10));
        PdfPTable tableInner = new PdfPTable(3);
        tableInner.addCell(new Paragraph("Модель", normal10));
        tableInner.addCell(new Paragraph("Год выпуска", normal10));
        tableInner.addCell(new Paragraph("Гос. номер", normal10));
        for (CarDto car: anketa.getCarList()) {
            tableInner.addCell(new Paragraph(car.getModel(), normal10));
            tableInner.addCell(new Paragraph(car.getYear(), normal10));
            tableInner.addCell(new Paragraph(car.getGovNumber(), normal10));
        }
        table.addCell(tableInner);
        document.add(table);
    }

    public static void createTable14(Document document, AnketaEntity anketa, Font font) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Отношение к воинской службе", font));
        if (anketa.isMilitary()){
            table.addCell(new Paragraph("Военнообязанный", font));
        } else {
            table.addCell(new Paragraph("Невоеннообязанный", font));
        }
        document.add(table);
    }

    public static void createTable15(Document document, AnketaEntity anketa) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Имеете ли Вы право на льготы согласно действующему законодательству?", normal10));
        table.addCell(new Paragraph(getBoolAsYesOrNo(anketa.isSVC()), bold10));
        document.add(table);
    }

    public static void createTable16(Document document, AnketaEntity anketa, List<String> headers) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.size());
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        for (String header: headers) {
            table.addCell(new Paragraph(header, bold10));
        }
        table.addCell(new Paragraph("Имеете ли Вы просроченный заем?", normal10));
        if (anketa.isExpiredLoan()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsExpiredLoanAnswer(), normal10));
        table.addCell(new Paragraph("Привлекались ли Вы к уголовной ответственности?", normal10));
        if (anketa.isCriminal()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsCriminalAnswer(), normal10));
        table.addCell(new Paragraph("Привлекались ли Ваши близкие родственники, члены семьи  к уголовной ответственности?", normal10));
        if (anketa.isRelativeCriminal()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsRelativeCriminalAnswer(), normal10));
        table.addCell(new Paragraph("Против Вас когда-либо возбуждалось уголовное дело?", normal10));
        if (anketa.isCriminalDelo()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsCriminalDeloAnswer(), normal10));
        table.addCell(new Paragraph("Выплачиваете ли Вы алименты?", normal10));
        if (anketa.isAlimentPayer()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsAlimentPayerAnswer(), normal10));
        table.addCell(new Paragraph("Привлекались ли Вы к административной ответственности?", normal10));
        if (anketa.isHooligan()){
            table.addCell(new Paragraph("ДА", normal10));
            table.addCell(new Paragraph("", normal10));
        } else {
            table.addCell(new Paragraph("", normal10));
            table.addCell(new Paragraph("НЕТ", normal10));
        }
        table.addCell(new Paragraph(anketa.getIsHooliganAnswer(), normal10));
        document.add(table);
    }

    public static void createTable17(Document document, AnketaEntity anketa, Font font) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph("Дополнительная информация о себе:", font));
        table.addCell(new Paragraph(anketa.getAdditionalInfo(), font));
        table.addCell(new Paragraph("Есть ли у Вас дополнительный доход (работа, дистрибьютерство/представительство в торговых компаниях)", font));
        table.addCell(new Paragraph(anketa.getExtraIncome(), font));
        document.add(table);
    }

    public static String getBoolAsYesOrNo(boolean bool){
        if (bool) return "ДА";
        else return "НЕТ";
    }
}
