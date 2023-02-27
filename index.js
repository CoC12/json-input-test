let layerCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.querySelector('.json-input');
    initContainer(jsonInput);

    // 出力ボタン
    const outputButton = document.querySelector('.json-input__output-button');
    const outputField = document.querySelector('.json-input__output-field');
    const containerElement = document.querySelector('.json-input__field-container');
    outputButton.addEventListener('click', () => {
        outputField.value = JSON.stringify(generateJSON(containerElement), null, 4);
    });
});

// コンテナ初期化
const initContainer = (container) => {
    const template = document.querySelector('.json-input__template-container');
    const templateContainer = template.content.cloneNode(true).querySelector('.json-input__container');
    container.appendChild(templateContainer);

    const skuUnitRadioId = `sku-unit-${layerCount}`;
    layerCount ++;
    // ラジオボタン
    const skuUnitRadio = templateContainer.querySelector('.json-input__sku-unit-radio');
    skuUnitRadio.id = skuUnitRadioId;
    // ラジオボタンラベル
    const skuUnitLabel = templateContainer.querySelector('.json-input__sku-unit-label');
    skuUnitLabel.setAttribute('for', skuUnitRadioId);

    const fieldContainer = templateContainer.querySelector('.json-input__field-container');
    // フィールド追加ボタン
    const addFieldButton = templateContainer.querySelector('.json-input__add-field-button');
    addFieldButton.addEventListener('click', () => {
        addField(fieldContainer);
    });
    // 子要素ボタン
    const addChildButton = templateContainer.querySelector('.json-input__add-child-button');
    addChildButton.addEventListener('click', () => {
        addChild(fieldContainer);
    });
}

// フィールド追加処理
const addField = (container) => {
    const template = document.querySelector('.json-input__template-field');
    const templateField = template.content.cloneNode(true).querySelector('.json-input__field');
    container.appendChild(templateField);
    // フィールド削除ボタン
    const removeFieldButton = templateField.querySelector('.json-input__remove-field-button');
    removeFieldButton.addEventListener('click', () => {
        templateField.remove();
    });
};

// 子要素追加処理
const addChild = (container) => {
    const template = document.querySelector('.json-input__template-child');
    const templateChild = template.content.cloneNode(true).querySelector('.json-input__child');
    container.appendChild(templateChild);
    // 子要素削除ボタン
    const removeChildButton = templateChild.querySelector('.json-input__remove-child-button');
    removeChildButton.addEventListener('click', () => {
        templateChild.remove();
    });
    // 子要素コンテナ初期化
    const childContainer = templateChild.querySelector('.json-input__child-container');
    initContainer(childContainer);
}

// JSONオブジェクト生成
const generateJSON = (containerElement) => {
    const json = {};
    const fieldNodeList = containerElement.querySelectorAll(':scope > .json-input__field');
    const childNodeList = containerElement.querySelectorAll(':scope > .json-input__child');

    // キーと値を持つ要素を走査してJSONオブジェクトを作成する
    fieldNodeList.forEach(field => {
        const keyInput = field.querySelector('.key');
        const valueInput = field.querySelector('.value');
        json[keyInput.value] = valueInput.value;
    });

    // 子要素を再帰的に処理してJSONオブジェクトを作成する
    childNodeList.forEach(child => {
        const keyInput = child.querySelector('.key');
        const childContainer = child.querySelector('.json-input__field-container');
        json[keyInput.value] = generateJSON(childContainer);
    });
    return json;
}
