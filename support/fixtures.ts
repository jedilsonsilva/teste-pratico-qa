import { test as base } from '@playwright/test';
import { createUiLoginActions } from './actions/uiLoginActions';
import { createUiInventoryActions } from './actions/uiInventoryActions';
import { createUiCheckoutActions } from './actions/uiCheckoutActions';
import { createApiAuthActions } from './actions/apiAuthActions';
import { createApiBookingActions } from './actions/apiBookingActions';

type App = {
  ui: {
    login: ReturnType<typeof createUiLoginActions>;
    inventory: ReturnType<typeof createUiInventoryActions>;
    checkout: ReturnType<typeof createUiCheckoutActions>;
  };
  api: {
    auth: ReturnType<typeof createApiAuthActions>;
    booking: ReturnType<typeof createApiBookingActions>;
  }
};

export const test = base.extend<{ app: App }>({
  app: async ({ page, request }, use) => {
    const app: App = {
      ui: {
        login: createUiLoginActions(page),
        inventory: createUiInventoryActions(page),
        checkout: createUiCheckoutActions(page),
      },
      api: {
        auth: createApiAuthActions(request),
        booking: createApiBookingActions(request),
      }
    };
    await use(app);
  },
});

export { expect } from '@playwright/test';
