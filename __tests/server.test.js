import { expect } from 'chai';
import getEnv from '../lib/utils/get-env';

getEnv();

describe('Check Status of Node API', function () {
  it('Smoke Test', function () {
    expect(true).to.eql(true);
    expect(false).to.eql(false);
  })
})