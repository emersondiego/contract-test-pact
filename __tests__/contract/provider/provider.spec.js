import { Verifier } from '@pact-foundation/pact';

const providerService = `http://localhost:3378`;

describe('Pact Verification', () => {
  it('should validate the expectations of the consumer service', () => {
    const brokerOpts = {
      provider: 'characters-api-application',
      providerBaseUrl: providerService,
      pactUrls: [`http://localhost:9292/pacts/provider/characters-api-application/consumer/web-application/latest`],
      publishVerificationResult: true,
      providerVersion: '1.0.0'
    };

    // Descomentar caso queira validar o Pacto no Pactflow
    // Alterar os valores das variáveis PACTFLOW_URI e PACTFLOW_TOKEN

//     const pactFlowOpts = {
//       provider: 'characters-api-application',
//       providerBaseUrl: providerService,
//       pactBrokerUrl: PACTFLOW_URI,
//       pactBrokerToken: PACTFLOW_TOKEN,
//       publishVerificationResult: true,
//       providerVersion: '1.0.0'
//     };

    return new Verifier(brokerOpts).verifyProvider();
//     return new Verifier(pactFlowOpts).verifyProvider();
  })
});