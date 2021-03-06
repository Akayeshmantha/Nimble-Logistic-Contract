/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Context } from 'fabric-contract-api';
import { Order } from '../assets';
import { AssetList } from '../lists';
import { State } from '../ledger-api/state';

export class NimbleLogisticContext extends Context {

    public readonly orderList: AssetList<Order>;

    constructor() {
        super();
        this.orderList = new AssetList(this, 'orders', [Order]);
    }

    public setEvent(eventName: string, payload: State) {
        const buffer = payload.serialize();
        const json = JSON.parse(buffer.toString('utf8'));
        json.timestamp = (this.stub.getTxTimestamp().getSeconds() as any).toInt() * 1000;
        this.stub.setEvent(eventName, Buffer.from(JSON.stringify(json)));
    }
}
