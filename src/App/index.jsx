import * as React from 'react';
import Input from 'antd/es/input/Input';
import Divider from 'antd/es/divider';
import styled from 'styled-components';
import Col from 'antd/es/grid/col';
import encrypt from '../utils/encrypt';
import decrypt from '../utils/decrypt';
import createReport from '../utils/createReport';
import { Button } from 'antd';

const RootWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const ContentWrapper = styled.div`
    width: 1000px; 
    height: 100vh;  
`;

const ColWrapper = styled(Col)`
    padding: 10px;
`;

const ReportContainer = styled.div`
    
`;

export default class App extends React.Component {
    state = {
        sourceValue: '11111010011',
        generatorLen: '4',
        encryptedLine: '',
        decryptedLine: '',
        report: {},
    };

    recalc = () => {
        const { sourceValue, generatorLen } = this.state;
        const encrypted = encrypt(sourceValue, parseInt(generatorLen, 10));
        this.setState({
            encryptedLine: encrypted,
            decryptedLine: decrypt(encrypted, parseInt(generatorLen, 10)),
        });
    };

    componentDidMount() {
        this.recalc();
    }

    componentDidUpdate(prevProps, prevState) {
        const { sourceValue, generatorLen } = this.state;
        if (prevState.sourceValue !== sourceValue || prevState.generatorLen !== generatorLen) {
            this.recalc();
        }
    }

    handleSourceValueChange = e => this.setState({
        sourceValue: e.target.value
    });

    handleGeneratorLenChange = e => this.setState({
        generatorLen: e.target.value
    });

    handleCreateReport = e => {
        const { encryptedLine, generatorLen } = this.state;
        this.setState({
            report: createReport(encryptedLine, parseInt(generatorLen, 10))
        });
    };

    isDisabled = () => isNaN(parseInt(this.state.encryptedLine, 2)) || isNaN(parseInt(this.state.generatorLen, 10));

    render () {
        const {
            sourceValue,
            generatorLen,
            encryptedLine,
            decryptedLine,
            report,
        } = this.state;

        return (
            <RootWrapper>
                <ContentWrapper>
                    <div>
                        <ColWrapper span={ 3 }>Выполнил</ColWrapper>
                        <ColWrapper span={ 21 }>
                            Студент группы ИУ5-52
                            <br/>
                            <strong>Черков Виталий</strong>
                            <br/>
                            Вариант 22
                        </ColWrapper>
                    </div>
                    <div>
                        <ColWrapper span={ 10 }>
                            <Input
                                placeholder='Кодируемая строка'
                                value={ sourceValue }
                                onChange={ this.handleSourceValueChange }
                            />
                        </ColWrapper>
                        <ColWrapper span={ 8 }>
                            <Input
                                placeholder='Длина последовательности'
                                value={ generatorLen }
                                onChange={ this.handleGeneratorLenChange }
                            />
                        </ColWrapper>
                        <ColWrapper span={ 6 }>
                            <Button
                                disabled={ this.isDisabled() }
                                onClick={ this.handleCreateReport }>Подготовить отчет</Button>
                        </ColWrapper>
                    </div>
                    <h1>
                        <span>Encrypted: </span>{ encryptedLine }
                    </h1>
                    <h1>
                        <span>Decrypted: </span>{ decryptedLine }
                    </h1>
                    <Divider/>
                    <div>
                        <ColWrapper span={3}>Кратность</ColWrapper>
                        <ColWrapper span={5}>Кол-во данной кратности</ColWrapper>
                        <ColWrapper span={4}>Обнаружено</ColWrapper>
                        <ColWrapper span={4}>Исправлено</ColWrapper>
                        <ColWrapper span={4}>Обнаруж. спос-ть</ColWrapper>
                        <ColWrapper span={4}>Корр. спос-ть</ColWrapper>
                    </div>
                    <div>
                    {
                        Object.keys(report).map((diffsCount, index) => {
                            const sum = report[diffsCount].notFound + report[diffsCount].found;
                            let foundAbility = report[diffsCount].found / sum;
                            foundAbility = Math.round(foundAbility * 10000) / 10000;
                            let fixAbility = report[diffsCount].success / sum;
                            fixAbility = Math.round(fixAbility * 10000) / 10000;
                            return sum !== 1 ? (
                                <React.Fragment key={ index }>
                                    <div>
                                        <ColWrapper span={3}>{ diffsCount }</ColWrapper>
                                        <ColWrapper span={5}>{ sum }</ColWrapper>
                                        <ColWrapper span={4}>{ report[diffsCount].found }</ColWrapper>
                                        <ColWrapper span={4}>{ report[diffsCount].success }</ColWrapper>
                                        <ColWrapper span={4}>{ foundAbility }</ColWrapper>
                                        <ColWrapper span={4}>{ fixAbility }</ColWrapper>
                                    </div>
                                    <Divider/>
                                </React.Fragment>
                            ) : undefined;
                        }
                        )
                    }
                    </div>
                </ContentWrapper>
            </RootWrapper>
        )
    }
}
