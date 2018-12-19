import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();
  const currentMonthNum: number = new Date().getMonth();
  const currentMonthStr: string = datepicker.monthNames[new Date().getMonth()];
  const prevMonthStr: string = datepicker.monthNames[currentMonthNum === 0 ? 11 : currentMonthNum - 1];
  const currentYearNum: number = new Date().getFullYear();
  const currentYearStr: string = currentYearNum.toString();
  const prevYearStr: string = (currentYearNum - 1).toString();
  const nextMonthStr: string = datepicker.monthNames[(currentMonthNum + 1)];
  const nextYearStr: string = (currentYearNum + 1).toString();

  beforeEach(() => datepicker.navigateTo());

    describe('Basic datepicker', () => {
      const basic = datepicker.exampleDemosArr.basic;

      beforeEach(() => datepicker.scrollToMenu('Basic'));

    it('example contains 2 inputs: Datepicker and Daterangepicker with appropriate placeholders', () => {
        datepicker.isInputHaveAttrs(basic, [
          { attr: 'placeholder', value: 'Datepicker' },
          { attr: 'type', value: 'text' }], 0);

        datepicker.isInputHaveAttrs(basic, [
          { attr: 'placeholder', value: 'Daterangepicker' },
          { attr: 'type', value: 'text' }], 1);
      });

      it('when user clicks on "Datepicker" input, container with 2 arrows: "‹", "›" opened, no one date selected', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.isSelectedDateExist('datepicker', false);
        datepicker.isDatepickerNavigationFullyActiveAndCorrect('date');
      });

      it('when user clicks on "‹" - previous month shown, when user clicks on "›" - next month shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('<');
        datepicker.isSelectedDateExist('datepicker', false);
        datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth() - 1]);
        datepicker.clickOnNavigation('>');
        datepicker.isSelectedDateExist('datepicker', false);
        datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth()]);
        datepicker.clickOnNavigation('>');
        datepicker.isSelectedDateExist('datepicker', false);
        datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth() + 1]);
      });

      it('when user clicks on month, then full table with 12 months shown with year in head block', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('month');
        datepicker.isDatepickerNavigationFullyActiveAndCorrect('month');
        datepicker.isDatePickerBodyExistAndCorrect('month');
        datepicker.isDatePickerTriggerCorrect('month');
      });

      it('when user clicks on month and "‹" button - previous year in head block shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('month');
        datepicker.clickOnNavigation('<');
        datepicker.isDatePickerBodyExistAndCorrect('month');
        datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() - 1).toString());
      });

      it('when user clicks on month and "›" button - next year in head block shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('month');
        datepicker.clickOnNavigation('>');
        datepicker.isDatePickerBodyExistAndCorrect('month');
        datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() + 1).toString());
      });

      it('when user clicks on month and then on any month - this month shown in head block, dates mode', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('month');
        datepicker.clickOnDatepickerTableItem('month', 5);
        datepicker.isDatePickerBodyExistAndCorrect('date');
        datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[5]);
      });

      it('when user clicks on year, then table with 16 years shown with year interval in head block', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.isDatepickerNavigationFullyActiveAndCorrect('year');
        datepicker.isDatePickerBodyExistAndCorrect('year');
        datepicker.isDatePickerTriggerCorrect('year');
      });

      it('when user clicks on year and "‹" button - interval with previous 16 years shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.clickOnNavigation('<');
        datepicker.isDatePickerBodyExistAndCorrect('year');
        datepicker.isVisibleMonthOrYearEqual(
          `${(new Date().getFullYear() - 7 - 16)} - ${(new Date().getFullYear() + 8 - 16)}`);
      });

      it('when user clicks on year and "›" button - interval with next 16 years shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.clickOnNavigation('>');
        datepicker.isDatePickerBodyExistAndCorrect('year');
        datepicker.isVisibleMonthOrYearEqual(
          `${(new Date().getFullYear() - 7 + 16)} - ${(new Date().getFullYear() + 8 + 16)}`);
      });

      it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.clickOnDatepickerTableItem('year', 2);
        datepicker.isDatePickerBodyExistAndCorrect('month');
        datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
      });

      it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.clickOnDatepickerTableItem('year', 2);
        datepicker.isDatePickerBodyExistAndCorrect('month');
        datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
      });

      it('when user clicks on: year mode => year => any month - then this month, year shown with dates mode', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnNavigation('year');
        datepicker.clickOnDatepickerTableItem('year', 0);
        datepicker.clickOnDatepickerTableItem('month', 0);
        datepicker.isDatePickerBodyExistAndCorrect('date');
        datepicker.isDatepickerNavigationFullyActiveAndCorrect(
          'date', datepicker.monthNames[0], (new Date().getFullYear() - 7).toString());
      });

      it('when user clicks on any date - then this date appeared in the input in format "mm/dd/yyyy"', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnDatepickerTableItem('date', undefined, '10');
        datepicker.isInputValueEqual(basic, `${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
      });

      it('when user chose date and click on "Datepicker" again, container opened and chosen date selected', () => {
        datepicker.clickOnDatepickerInput(basic);
        datepicker.clickOnDatepickerTableItem('date', undefined, '10');
        datepicker.clickOnDatepickerInput(basic);
        datepicker.isSelectedDateExist('datepicker', true, '10');
      });

      it('when user clears input, add date in format "mm.dd.yyyy", click "Enter" - it converted to "mm/dd/yyyy"', () => {
        datepicker.clearInputAndSendKeys(basic, '05.10.2015', 0);
        datepicker.clickEnterOnInput(basic);
        datepicker.isInputValueEqual(basic, '05/10/2015');
        datepicker.clickOnDatepickerInput(basic);
        datepicker.isSelectedDateExist('datepicker', true, '10');
        datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', datepicker.monthNames[4], '2015');
      });

      it('when user clears input and add there date in bad format, click "Enter" - "Invalid date" shown', () => {
        datepicker.clearInputAndSendKeys(basic, '20,10,2015', 0);
        datepicker.clickEnterOnInput(basic);
        datepicker.isInputValueEqual(basic, 'Invalid date', 0);
        datepicker.clickOnDatepickerInput(basic);
        datepicker.isSelectedDateExist('datepicker', false);
      });

      it('when user clears input, add date in format "mmddyyyy", click "Enter" - date converted "mm/dd/yyyy"', () => {
        datepicker.clearInputAndSendKeys(basic, '05102015', 0);
        datepicker.clickEnterOnInput(basic);
        datepicker.isInputValueEqual(basic, '05/10/2015');
        datepicker.clickOnDatepickerInput(basic);
        datepicker.isSelectedDateExist('datepicker', true, '10');
        datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', datepicker.monthNames[4], '2015');
      });
    });

  describe('Basic daterangepicker', () => {
    const basic = datepicker.exampleDemosArr.basic;

    beforeEach(() => datepicker.scrollToMenu('Basic'));

    it(`when user clicks on "Daterangepicker" input after datepicker, 2d container opened and 1t closed
      range contains 2 calendar blocks, 2 arrows: "‹/›", shown interval from current month/year and next`, () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDatepickerTableItem('date', 0, '15');
      datepicker.isInputValueEqual(basic,
        `${currentMonthNum + 1}/15/${currentYearStr}`);
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.isDateRangepickerNavigationFullyActiveAndCorrect();
      datepicker.isDatepickerOpened(basic, false);
    });

    it('when user clicks on "‹" - shown interval, which started from previous month', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('<');
      datepicker.isDateRangepickerNavigationFullyActiveAndCorrect(
        'date', prevMonthStr, currentMonthNum === 0 ? prevYearStr : currentYearStr);
    });

    it('When user clicks on "›" - shown interval, which started from next month', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('>');
      datepicker.isDateRangepickerNavigationFullyActiveAndCorrect(
        'date', nextMonthStr,  currentMonthNum === 11 ? nextYearStr : currentYearStr);
    });

    it('when user clicks on month, then 2 tables with 12 months in each shown with years(current and next) in head block', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('month-left');
      datepicker.isDateRangepickerNavigationFullyActiveAndCorrect('month');
      datepicker.isDaterangePickerBodyExistAndCorrect('month');
      datepicker.isDaterangePickerTriggerCorrect('month');
    });

    it('when user clicks on month and "‹" button - interval, started from previous year in head block shown', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('month-left');
      datepicker.clickOnDateRangePickerNavigation('<');
      datepicker.isDaterangePickerBodyExistAndCorrect('month');
      datepicker.isVisibleDateRangePickerMonthOrYearEqual(prevYearStr, currentYearStr);
    });

    it('when user clicks on month and "›" button - interval, started from next year in head block shown', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('month-left');
      datepicker.clickOnDateRangePickerNavigation('>');
      datepicker.isDaterangePickerBodyExistAndCorrect('month');
      datepicker.isVisibleDateRangePickerMonthOrYearEqual(nextYearStr, (currentYearNum + 2).toString());
    });

    it('when user clicks on month and any month - then tables with dates shown and in head chosen month', () => {
      datepicker.clickOnDaterangepickerInput(basic);
      datepicker.clickOnDateRangePickerNavigation('month-right');
      // datepicker.clickOnDatepickerTableItem() // TODO need to finish


    });
  });
});
