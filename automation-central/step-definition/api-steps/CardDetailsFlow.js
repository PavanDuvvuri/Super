const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
const restManagerDEl = require('../../core-framework/rest_connector/delete_rest_calls');
const restManagerPut = require('../../core-framework/rest_connector/put_rest_calls');
const constants = require('../../core-framework/utils/constants')
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;


 Then('I call the Get cards API with all fields',async function () {
    var getCardsAllField = {
      access_token: loadConstants.token,
      providerRef :constants.providerRef,
      methodRef   :constants.methodRef,
    }
    responseData = await restManager.getCallWithFormdata('/card.json?card', getCardsAllField);
    console.log(responseData.text);
    console.log("Provider::"+constants.methodRef)

  });

  Then('check the get cards response details',async function () {
    var cardsNo = responseData.body.response.customer.card.length
    for(var cardIndex =0; cardIndex < cardsNo; cardIndex++){
      var providerRef = responseData.body.response.customer.card[cardIndex].providerRef
      var lastUsedOn = responseData.body.response.customer.card[cardIndex].lastUsedOn
      var cardId = responseData.body.response.customer.card[cardIndex].id
      console.log("card"+cardId)
      loadConstants['cardId'] = responseData.body.response.customer.card[cardIndex].id
      var holderName = responseData.body.response.customer.card[cardIndex].holderName
      var cardDesc = responseData.body.response.customer.card[cardIndex].description
      var type = responseData.body.response.customer.card[cardIndex].type
      var methodRef = responseData.body.response.customer.card[cardIndex].methodRef

      assert.typeOf(methodRef, 'string');
      assert.equal(methodRef, constants.methodRef);
      assert.typeOf(providerRef, 'string');
      assert.equal(providerRef, constants.providerRef);
      assert.typeOf(lastUsedOn, 'number');
      assert.typeOf(cardId, 'number');
      assert.typeOf(holderName, 'string');
      assert.typeOf(cardDesc, 'string');
      assert.typeOf(type, 'string');

    }
  });

  Then('I call the Get cards API with mandatory fields',async function () {
    var getCardsMandatoryField = {
        access_token: loadConstants.token,
    }
    responseData = await restManager.getCallWithFormdata('/card.json', getCardsMandatoryField);
    console.log(responseData.text);

  });
  When('I call the Get cards API without accesstoken', async function () {
      var getCardsWithoutAccessToken = {
       providerRef:constants.providerRef ,
  }  
  responseData = await restManager.getCallWithFormdata('/card.json',getCardsWithoutAccessToken);
  console.log(responseData.text);
  });

  Then('check the get cards without accesstoken', async function () {
    var devMsg = responseData.body.response.status.devMessage
    assert.include(devMsg, "Required String parameter 'access_token' is not present");
  });

  When('I call the Delete cards API',async function () {
    var cardId=loadConstants.cardId
    var DeactivateCards = {
      access_token: loadConstants.token,
     
    }
    responseData = await restManagerDEl.deleteCallWithFormdata('/card/'+cardId, DeactivateCards);
    console.log(responseData.text);
  
  });
  
  Then('check the delete cards response details',async function () {
    var resPeriod = responseData.body.response.status.value
    assert.equal(resPeriod, 'Success');
  
  });
  
  Then('I call the Activate card API',async function () {
    var cardId=loadConstants.cardId
    var ActivateCards = {
      access_token: loadConstants.token,
      active:'true'
    }
    responseData = await restManagerPut.putCallWithToken('/card/'+cardId, ActivateCards);
    console.log(responseData.text);
   
  });
  
  Then('check the activate cards response details',async function () {
    var responseValue = responseData.body.response.status.value
    assert.equal(responseValue, 'Success');
  
  });
  
  When('I call the deactivate card API with invalid card id',async function () {
    var deactivateCardInvalidId = {
      access_token: loadConstants.token,
    }
    responseData = await restManagerDEl.deleteCallWithFormdata('/card/123', deactivateCardInvalidId);
    console.log(responseData.text);
   
  });
  
  Then('check the deactivate card with invalid card response details',async function () {
    var devMessage = responseData.body.response.status.devMessage
  console.log("message::"+devMessage)
  assert.include(devMessage,constants.invalidcardMessage );
  
  });
  
  When('I call the deactivate card API without access token',async function () {
    var cardId=loadConstants.cardId
    responseData = await restManagerDEl.deleteCall('/card/'+cardId);
    console.log("logger::")
    console.log(responseData.text);
  });
 
  
   When('I call the activate card API without access token',async function () {
    var cardId=loadConstants.cardId
    var ActivateCards = {
      active:'true'
    }
    responseData = await restManagerPut.putCall('/card/'+cardId, ActivateCards);
    console.log(responseData.text);
    console.log("anjana::")
  
  });
  
  When('I call the activate card API with invalid card id',async function () {
    var cardId=123
    var ActivateCards = {
      access_token: loadConstants.token,
      active:'true'
    }
    responseData = await restManagerPut.putCallWithToken('/card/'+cardId, ActivateCards);
    console.log(responseData.text);
  });
  
  Then('check the cards response with invalid card id',async function () {
    var devMessageInvalidCard = responseData.body.response.status.devMessage
    assert.include(devMessageInvalidCard,constants.invalidcardMessage );
  });
  