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
    width: 700px; 
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

    componentDidUpdate(prevProps, prevState) {
        const { sourceValue, generatorLen } = this.state;
        if (prevState.sourceValue !== sourceValue || prevState.generatorLen !== generatorLen) {
            const encrypted = encrypt(sourceValue, parseInt(generatorLen, 10));
            this.setState({
                encryptedLine: encrypted,
                decryptedLine: decrypt(encrypted, parseInt(generatorLen, 10)),
            });
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
                        <ColWrapper span={8}>Количество отличий</ColWrapper>
                        <ColWrapper span={8}>Распознано</ColWrapper>
                        <ColWrapper span={8}>Не распознано</ColWrapper>
                    </div>
                    <div>
                    {
                        Object.keys(report).map((diffsCount, index) => (
                            <React.Fragment key={ index }>
                                <div>
                                    <ColWrapper span={8}>{ diffsCount }</ColWrapper>
                                    <ColWrapper span={8}>{ report[diffsCount].success }</ColWrapper>
                                    <ColWrapper span={8}>{ report[diffsCount].error }</ColWrapper>
                                </div>
                                <Divider/>
                            </React.Fragment>
                        ))
                    }
                    </div>
                </ContentWrapper>
            </RootWrapper>
        )
    }
}
