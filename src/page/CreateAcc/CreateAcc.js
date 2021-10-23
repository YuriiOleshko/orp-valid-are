/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedDate, useIntl } from 'react-intl';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { appStore } from '../../state/app';
import { GAS, parseNearAmount } from '../../state/near';
import IntroPage from '../../components/IntroPage';
import CustomBtn from '../../components/generic/CustomBtn';
import CustomInput from '../../components/generic/CustomInput';
import { getContract, contractMethods } from '../../utils/near-utils';
import { copyRight } from '../Login/LangLogin';

import {
  title,
  inputPlaceholderName,
  inputPlaceholderLast,
  inputPlaceholderCompany,
  inputPlaceholderEmail,
  btnLabel,
  btnLateLabel,
} from './LangCreateAcc';

const CreateAcc = () => {
  const history = useHistory();
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { wallet, account, app } = state;
  const { profile } = app;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    update('loading', true);
    const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    const test = await contract.add_profile(
      {
        account_id: account.accountId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        organization: data.companyName,
      },
      GAS,
      deposit,
    );
    update('loading', false);
    history.push('/');
  };

  if (profile && Object.keys(profile).length) {
    return <Redirect to="/" />;
  }

  return (
    <section className="login">
      <div className="login__wrapper container">
        <IntroPage />
        {!state.loading ? (
          <div className="login__entry">
            <div className="login__form">
              <h2 className="login__form-title">{intl.formatMessage(title)}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  uncontrolled
                  type="text"
                  classInputWrapper="input-wrapper-login"
                  classLabel="input-label-login"
                  error={errors.firstName}
                  name="firstName"
                  labelText={intl.formatMessage(inputPlaceholderName)}
                  register={register}
                  required
                  maxLength={80}
                />
                <CustomInput
                  uncontrolled
                  type="text"
                  classInputWrapper="input-wrapper-login"
                  classLabel="input-label-login"
                  error={errors.lastName}
                  labelText={intl.formatMessage(inputPlaceholderLast)}
                  name="lastName"
                  register={register}
                  required
                  maxLength={100}
                />

                <CustomInput
                  uncontrolled
                  type="text"
                  classInputWrapper="input-wrapper-login"
                  classLabel="input-label-login"
                  labelText={intl.formatMessage(inputPlaceholderCompany)}
                  name="companyName"
                  register={register}
                  maxLength={100}
                />
                <CustomInput
                  uncontrolled
                  type="text"
                  classInputWrapper="input-wrapper-login"
                  classLabel="input-label-login"
                  labelText={intl.formatMessage(inputPlaceholderEmail)}
                  error={errors.email}
                  name="email"
                  register={register}
                  required
                  maxLength={180}
                  pattern={/^\S+@\S+$/i}
                />
                <div className="login__wrapper-btn_acc">
                  <CustomBtn
                    label={intl.formatMessage(btnLabel)}
                    customClass="btn__acc"
                    iconClass=""
                    type="submit"
                    handleClick={() => {}}
                  />
                  <Link to="/" className="login__anchor">
                    {intl.formatMessage(btnLateLabel)}
                  </Link>
                </div>
              </form>
            </div>
            <p className="login__copy">
              {intl.formatMessage(copyRight)}
              <FormattedDate value={Date.now()} year="numeric" />
            </p>
          </div>
        ) : (
          <p className="login__loading">
            <i className="icon-shield" />
            Sending data to blockchain...
          </p>
        )}
      </div>
    </section>
  );
};

export default CreateAcc;
